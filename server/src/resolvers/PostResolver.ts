import {
  Resolver,
  Mutation,
  Arg,
  Ctx,
  UseMiddleware,
  Query,
} from "type-graphql";
import { User } from "../entity/User";
import { MyContext } from "../auth/MyContext";
import { isAdmin, isAuth } from "../auth/isAuth";
import { sendEmail } from "../auth/sendEmails";
import { paginate } from "../utils/pagination";
import { AllPostsResponse } from "../entity/graphqlObjectTypes/ObjectTypes";
import { Post } from "../entity/Post";

@Resolver()
export class PostResolver {
  @Mutation(() => Boolean)
  @UseMiddleware(isAdmin)
  async addPost(
    @Ctx() { payload }: MyContext,
    @Arg("content") content: string,
    @Arg("sendEmail", () => Boolean, { nullable: true })
    isSendEmail: boolean = false
  ) {
    try {
      const user = await User.findOne({ where: { id: payload!.userId } });
      if (user) {
        const post = Post.create({
          content,
          user,
          company: payload!.company,
        });
        await post.save();
        if (isSendEmail) {
          const users = await User.find({
            where: { company: payload!.company },
          });
          if (users)
            users.forEach((user) => {
              if (user.id != payload!.userId)
                sendEmail(
                  user.email,
                  `New announcement on docketapp@${payload!.company.name}`,
                  content
                );
            });
        }
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAdmin)
  async deletePost(@Arg("id") id: number) {
    try {
      const post = await Post.findOne({ where: { id } });
      if (post) {
        post.remove();
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  @Query(() => Number)
  @UseMiddleware(isAuth)
  async getUnseenPostsNumber(@Ctx() { payload }: MyContext) {
    try {
      const user = await User.getRepository()
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.seenPosts", "seen_posts")
        .where("user.id = :id", { id: payload!.userId })
        .getOne();
      const allPosts = await Post.count({
        where: { company: payload!.company },
      });
      if (user && allPosts) {
        return allPosts - user.seenPosts.length;
      }
      return 0;
    } catch (err) {
      console.log(err);
      return 0;
    }
  }

  @Query(() => AllPostsResponse)
  @UseMiddleware(isAuth)
  async getPosts(
    @Ctx() { payload }: MyContext,
    @Arg("page", { nullable: true }) page: number = 1,
    @Arg("perPage", { nullable: true }) perPage: number = 10
  ) {
    try {
      const posts = await Post.getRepository()
        .createQueryBuilder("post")
        .leftJoinAndSelect("post.user", "users")
        .where("post.companyId = :companyId", {
          companyId: payload!.company.id,
        })
        .orderBy("post.date", "DESC");
      const res = await paginate(posts, page, perPage);
      if (res.records) {
        const user = await User.getRepository()
          .createQueryBuilder("user")
          .leftJoinAndSelect("user.seenPosts", "seen_posts")
          .where("user.id = :id", { id: payload!.userId })
          .getOne();
        if (user && res.records) {
          user.seenPosts = [...user.seenPosts, ...res.records];
          await user.save();
          console.log("seenPosts:", user.seenPosts);
        }
        return { posts: res.records, total: res.total };
      }
      return { posts: [], total: 0 };
    } catch (err) {
      console.log(err);
      return { posts: [], total: 0 };
    }
  }
}
