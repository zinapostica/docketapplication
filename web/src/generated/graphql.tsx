import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AddTeamResponse = {
  __typename?: 'AddTeamResponse';
  team?: Maybe<Team>;
  success: Scalars['Boolean'];
};

export type AllPostsResponse = {
  __typename?: 'AllPostsResponse';
  posts: Array<Post>;
  total: Scalars['Float'];
};

export type AllTeamsResponse = {
  __typename?: 'AllTeamsResponse';
  teams: Array<Team>;
  total: Scalars['Float'];
};

export type AllUsersResponse = {
  __typename?: 'AllUsersResponse';
  users?: Maybe<Array<User>>;
  total?: Maybe<Scalars['Float']>;
};

export type Appointment = {
  __typename?: 'Appointment';
  id: Scalars['Float'];
  startDate: Scalars['DateTime'];
  endDate: Scalars['DateTime'];
  rRule: Scalars['String'];
  exDate: Scalars['String'];
  userId: Scalars['Float'];
  type: Scalars['Float'];
  workPatternId: Scalars['Float'];
  patternDetailId: Scalars['Float'];
};

export type ChangePasswordResponse = {
  __typename?: 'ChangePasswordResponse';
  message: Scalars['String'];
  isChanged: Scalars['Boolean'];
};

export type Company = {
  __typename?: 'Company';
  id: Scalars['Int'];
  name: Scalars['String'];
  users: Array<User>;
  teams: Array<Team>;
};

export type CompanyInputType = {
  id: Scalars['Int'];
  name: Scalars['String'];
  users: Array<UserInputType>;
  teams: Array<TeamInputType>;
};


export type GetScheduleResponse = {
  __typename?: 'GetScheduleResponse';
  resources: Array<Resource>;
  total?: Maybe<Scalars['Float']>;
  appointments?: Maybe<Array<Appointment>>;
};

export type Instance = {
  __typename?: 'Instance';
  text: Scalars['String'];
  id: Scalars['Float'];
  color: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  registerUser: Scalars['Boolean'];
  editUser: Scalars['Boolean'];
  addUserWorkPattern: Scalars['Boolean'];
  addUserToTeam: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  addPatternDetail: Scalars['Boolean'];
  editPatternDetail: Scalars['Boolean'];
  deletePatternDetail: Scalars['Boolean'];
  addTeam: AddTeamResponse;
  deleteTeam: Scalars['Boolean'];
  addPost: Scalars['Boolean'];
  deletePost: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  revokeRefreshTokensForUser: Scalars['Boolean'];
  login: LoginResponse;
  register: Scalars['Boolean'];
  changePassword: ChangePasswordResponse;
  forgotPassword: Scalars['Boolean'];
  changeForgottenPassword: Scalars['Boolean'];
};


export type MutationRegisterUserArgs = {
  teams?: Maybe<Array<TeamInputType>>;
  workPatterns?: Maybe<Array<WorkPatternsInputType>>;
  isAdmin: Scalars['Boolean'];
  startDate: Scalars['DateTime'];
  lastName: Scalars['String'];
  firstName: Scalars['String'];
  email: Scalars['String'];
};


export type MutationEditUserArgs = {
  teams?: Maybe<Array<TeamInputType>>;
  workPatterns?: Maybe<Array<WorkPatternsInputType>>;
  isAdmin: Scalars['Boolean'];
  startDate: Scalars['DateTime'];
  lastName: Scalars['String'];
  firstName: Scalars['String'];
  email: Scalars['String'];
  userId: Scalars['Float'];
};


export type MutationAddUserWorkPatternArgs = {
  patternDetails: Array<PatternDetailsInput>;
  endDate: Scalars['DateTime'];
  repeatsOn: Scalars['DateTime'];
  startDate: Scalars['DateTime'];
  userId: Scalars['Float'];
};


export type MutationAddUserToTeamArgs = {
  teamName: Scalars['String'];
  userId: Scalars['Float'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['Float'];
};


export type MutationAddPatternDetailArgs = {
  type?: Maybe<Scalars['Float']>;
  exDate?: Maybe<Scalars['String']>;
  rRule?: Maybe<Scalars['String']>;
  workPatternId: Scalars['Float'];
  endDate: Scalars['String'];
  startDate: Scalars['String'];
};


export type MutationEditPatternDetailArgs = {
  type?: Maybe<Scalars['Float']>;
  exDate?: Maybe<Scalars['String']>;
  rRule?: Maybe<Scalars['String']>;
  patternDetailId: Scalars['Float'];
  endDate: Scalars['String'];
  startDate: Scalars['String'];
};


export type MutationDeletePatternDetailArgs = {
  patternDetailId: Scalars['Float'];
};


export type MutationAddTeamArgs = {
  users?: Maybe<Array<UserInputType>>;
  name: Scalars['String'];
};


export type MutationDeleteTeamArgs = {
  name: Scalars['String'];
};


export type MutationAddPostArgs = {
  sendEmail?: Maybe<Scalars['Boolean']>;
  content: Scalars['String'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};


export type MutationRevokeRefreshTokensForUserArgs = {
  userId: Scalars['Int'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  companyName: Scalars['String'];
  lastName: Scalars['String'];
  firstName: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  currentPassword: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangeForgottenPasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};

export type PatternDetails = {
  __typename?: 'PatternDetails';
  startDate?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
  rRule?: Maybe<Scalars['String']>;
  exDate?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['Float']>;
};

export type PatternDetailsInput = {
  startDate?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
  rRule?: Maybe<Scalars['String']>;
  exDate?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['Float']>;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Int'];
  content: Scalars['String'];
  user: User;
  teams: Array<User>;
  date: Scalars['DateTime'];
  seenUsers?: Maybe<Array<User>>;
  company: Company;
};

export type PostInputType = {
  id: Scalars['Int'];
  content: Scalars['String'];
  user: UserInputType;
  teams: Array<UserInputType>;
  date: Scalars['DateTime'];
  seenUsers?: Maybe<Array<UserInputType>>;
  company: CompanyInputType;
};

export type Query = {
  __typename?: 'Query';
  allUsers?: Maybe<AllUsersResponse>;
  me?: Maybe<User>;
  getSchedule?: Maybe<GetScheduleResponse>;
  allTeams?: Maybe<Array<Team>>;
  getUnseenPostsNumber: Scalars['Float'];
  getPosts: AllPostsResponse;
};


export type QueryAllUsersArgs = {
  perPage?: Maybe<Scalars['Float']>;
  page?: Maybe<Scalars['Float']>;
};


export type QueryGetScheduleArgs = {
  page?: Maybe<Scalars['Float']>;
  perPage?: Maybe<Scalars['Float']>;
};


export type QueryGetPostsArgs = {
  perPage?: Maybe<Scalars['Float']>;
  page?: Maybe<Scalars['Float']>;
};

export type Resource = {
  __typename?: 'Resource';
  fieldName: Scalars['String'];
  title: Scalars['String'];
  instances: Array<Instance>;
};

export type Team = {
  __typename?: 'Team';
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  users?: Maybe<Array<User>>;
  company?: Maybe<Company>;
};

export type TeamInputType = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  users?: Maybe<Array<UserInputType>>;
  company?: Maybe<CompanyInputType>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['String']>;
  isOTP?: Maybe<Scalars['Boolean']>;
  isAdmin?: Maybe<Scalars['Boolean']>;
  company?: Maybe<Company>;
  teams?: Maybe<Array<Team>>;
  workPatterns?: Maybe<Array<WorkPattern>>;
  posts?: Maybe<Array<Post>>;
  seenPosts?: Maybe<Array<Post>>;
};

export type UserInputType = {
  id: Scalars['Int'];
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['String']>;
  isOTP?: Maybe<Scalars['Boolean']>;
  isAdmin?: Maybe<Scalars['Boolean']>;
  company?: Maybe<CompanyInputType>;
  teams?: Maybe<Array<TeamInputType>>;
  workPatterns?: Maybe<Array<WorkPatternsInputType>>;
  posts?: Maybe<Array<PostInputType>>;
  seenPosts?: Maybe<Array<PostInputType>>;
};

export type WorkPattern = {
  __typename?: 'WorkPattern';
  id?: Maybe<Scalars['Float']>;
  startDate?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['String']>;
  repeatsOn?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  patternDetails: Array<PatternDetails>;
};

export type WorkPatternsInputType = {
  id?: Maybe<Scalars['Float']>;
  startDate?: Maybe<Scalars['String']>;
  endDate?: Maybe<Scalars['String']>;
  repeatsOn?: Maybe<Scalars['String']>;
  user?: Maybe<UserInputType>;
  patternDetails: Array<PatternDetailsInput>;
};

export type AddPatternDetailMutationVariables = Exact<{
  exDate?: Maybe<Scalars['String']>;
  rRule?: Maybe<Scalars['String']>;
  workPatternId: Scalars['Float'];
  endDate: Scalars['String'];
  startDate: Scalars['String'];
  type?: Maybe<Scalars['Float']>;
}>;


export type AddPatternDetailMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addPatternDetail'>
);

export type AddPostMutationVariables = Exact<{
  content: Scalars['String'];
  sendEmail?: Maybe<Scalars['Boolean']>;
}>;


export type AddPostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addPost'>
);

export type AddTeamMutationVariables = Exact<{
  users?: Maybe<Array<UserInputType> | UserInputType>;
  name: Scalars['String'];
}>;


export type AddTeamMutation = (
  { __typename?: 'Mutation' }
  & { addTeam: (
    { __typename?: 'AddTeamResponse' }
    & Pick<AddTeamResponse, 'success'>
    & { team?: Maybe<(
      { __typename?: 'Team' }
      & Pick<Team, 'name'>
    )> }
  ) }
);

export type AllTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllTeamsQuery = (
  { __typename?: 'Query' }
  & { allTeams?: Maybe<Array<(
    { __typename?: 'Team' }
    & Pick<Team, 'name'>
  )>> }
);

export type AllUsersQueryVariables = Exact<{
  page?: Maybe<Scalars['Float']>;
}>;


export type AllUsersQuery = (
  { __typename?: 'Query' }
  & { allUsers?: Maybe<(
    { __typename?: 'AllUsersResponse' }
    & Pick<AllUsersResponse, 'total'>
    & { users?: Maybe<Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'firstName' | 'lastName' | 'startDate' | 'isAdmin'>
      & { teams?: Maybe<Array<(
        { __typename?: 'Team' }
        & Pick<Team, 'name'>
      )>>, workPatterns?: Maybe<Array<(
        { __typename?: 'WorkPattern' }
        & Pick<WorkPattern, 'startDate' | 'endDate' | 'repeatsOn'>
        & { patternDetails: Array<(
          { __typename?: 'PatternDetails' }
          & Pick<PatternDetails, 'type' | 'startDate' | 'endDate' | 'rRule'>
        )> }
      )>> }
    )>> }
  )> }
);

export type ChangeForgottenPasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangeForgottenPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'changeForgottenPassword'>
);

export type ChangePasswordMutationVariables = Exact<{
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'ChangePasswordResponse' }
    & Pick<ChangePasswordResponse, 'message' | 'isChanged'>
  ) }
);

export type DeletePatternDetailMutationVariables = Exact<{
  patternDetailId: Scalars['Float'];
}>;


export type DeletePatternDetailMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePatternDetail'>
);

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePost'>
);

export type DeleteTeamMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type DeleteTeamMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteTeam'>
);

export type DeleteUserMutationVariables = Exact<{
  userId: Scalars['Float'];
}>;


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteUser'>
);

export type EditPatternDetailMutationVariables = Exact<{
  exDate?: Maybe<Scalars['String']>;
  rRule?: Maybe<Scalars['String']>;
  patternDetailId: Scalars['Float'];
  endDate: Scalars['String'];
  startDate: Scalars['String'];
  type?: Maybe<Scalars['Float']>;
}>;


export type EditPatternDetailMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'editPatternDetail'>
);

export type EditUserMutationVariables = Exact<{
  userId: Scalars['Float'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  isAdmin: Scalars['Boolean'];
  startDate: Scalars['DateTime'];
  teams?: Maybe<Array<TeamInputType> | TeamInputType>;
  workPatterns: Array<WorkPatternsInputType> | WorkPatternsInputType;
}>;


export type EditUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'editUser'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type GetPostsQueryVariables = Exact<{
  page?: Maybe<Scalars['Float']>;
  perPage?: Maybe<Scalars['Float']>;
}>;


export type GetPostsQuery = (
  { __typename?: 'Query' }
  & { getPosts: (
    { __typename?: 'AllPostsResponse' }
    & Pick<AllPostsResponse, 'total'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'content' | 'date'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'firstName' | 'lastName'>
      ) }
    )> }
  ) }
);

export type GetScheduleQueryVariables = Exact<{
  page?: Maybe<Scalars['Float']>;
  perPage?: Maybe<Scalars['Float']>;
}>;


export type GetScheduleQuery = (
  { __typename?: 'Query' }
  & { getSchedule?: Maybe<(
    { __typename?: 'GetScheduleResponse' }
    & Pick<GetScheduleResponse, 'total'>
    & { appointments?: Maybe<Array<(
      { __typename?: 'Appointment' }
      & Pick<Appointment, 'id' | 'userId' | 'rRule' | 'startDate' | 'endDate' | 'exDate' | 'type' | 'workPatternId' | 'patternDetailId'>
    )>>, resources: Array<(
      { __typename?: 'Resource' }
      & Pick<Resource, 'title' | 'fieldName'>
      & { instances: Array<(
        { __typename?: 'Instance' }
        & Pick<Instance, 'id' | 'text' | 'color'>
      )> }
    )> }
  )> }
);

export type GetUnseenPostsNumberQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUnseenPostsNumberQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'getUnseenPostsNumber'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'isAdmin'>
      & { company?: Maybe<(
        { __typename?: 'Company' }
        & Pick<Company, 'id' | 'name'>
      )> }
    ) }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'isAdmin'>
    & { company?: Maybe<(
      { __typename?: 'Company' }
      & Pick<Company, 'id' | 'name'>
    )> }
  )> }
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  companyName: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'register'>
);

export type RegisterUserMutationVariables = Exact<{
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  isAdmin: Scalars['Boolean'];
  startDate: Scalars['DateTime'];
  teams?: Maybe<Array<TeamInputType> | TeamInputType>;
  workPatterns: Array<WorkPatternsInputType> | WorkPatternsInputType;
}>;


export type RegisterUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'registerUser'>
);


export const AddPatternDetailDocument = gql`
    mutation AddPatternDetail($exDate: String, $rRule: String, $workPatternId: Float!, $endDate: String!, $startDate: String!, $type: Float) {
  addPatternDetail(
    workPatternId: $workPatternId
    startDate: $startDate
    endDate: $endDate
    rRule: $rRule
    exDate: $exDate
    type: $type
  )
}
    `;
export type AddPatternDetailMutationFn = Apollo.MutationFunction<AddPatternDetailMutation, AddPatternDetailMutationVariables>;

/**
 * __useAddPatternDetailMutation__
 *
 * To run a mutation, you first call `useAddPatternDetailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPatternDetailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPatternDetailMutation, { data, loading, error }] = useAddPatternDetailMutation({
 *   variables: {
 *      exDate: // value for 'exDate'
 *      rRule: // value for 'rRule'
 *      workPatternId: // value for 'workPatternId'
 *      endDate: // value for 'endDate'
 *      startDate: // value for 'startDate'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useAddPatternDetailMutation(baseOptions?: Apollo.MutationHookOptions<AddPatternDetailMutation, AddPatternDetailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPatternDetailMutation, AddPatternDetailMutationVariables>(AddPatternDetailDocument, options);
      }
export type AddPatternDetailMutationHookResult = ReturnType<typeof useAddPatternDetailMutation>;
export type AddPatternDetailMutationResult = Apollo.MutationResult<AddPatternDetailMutation>;
export type AddPatternDetailMutationOptions = Apollo.BaseMutationOptions<AddPatternDetailMutation, AddPatternDetailMutationVariables>;
export const AddPostDocument = gql`
    mutation AddPost($content: String!, $sendEmail: Boolean) {
  addPost(content: $content, sendEmail: $sendEmail)
}
    `;
export type AddPostMutationFn = Apollo.MutationFunction<AddPostMutation, AddPostMutationVariables>;

/**
 * __useAddPostMutation__
 *
 * To run a mutation, you first call `useAddPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPostMutation, { data, loading, error }] = useAddPostMutation({
 *   variables: {
 *      content: // value for 'content'
 *      sendEmail: // value for 'sendEmail'
 *   },
 * });
 */
export function useAddPostMutation(baseOptions?: Apollo.MutationHookOptions<AddPostMutation, AddPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPostMutation, AddPostMutationVariables>(AddPostDocument, options);
      }
export type AddPostMutationHookResult = ReturnType<typeof useAddPostMutation>;
export type AddPostMutationResult = Apollo.MutationResult<AddPostMutation>;
export type AddPostMutationOptions = Apollo.BaseMutationOptions<AddPostMutation, AddPostMutationVariables>;
export const AddTeamDocument = gql`
    mutation AddTeam($users: [UserInputType!], $name: String!) {
  addTeam(name: $name, users: $users) {
    success
    team {
      name
    }
  }
}
    `;
export type AddTeamMutationFn = Apollo.MutationFunction<AddTeamMutation, AddTeamMutationVariables>;

/**
 * __useAddTeamMutation__
 *
 * To run a mutation, you first call `useAddTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTeamMutation, { data, loading, error }] = useAddTeamMutation({
 *   variables: {
 *      users: // value for 'users'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useAddTeamMutation(baseOptions?: Apollo.MutationHookOptions<AddTeamMutation, AddTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddTeamMutation, AddTeamMutationVariables>(AddTeamDocument, options);
      }
export type AddTeamMutationHookResult = ReturnType<typeof useAddTeamMutation>;
export type AddTeamMutationResult = Apollo.MutationResult<AddTeamMutation>;
export type AddTeamMutationOptions = Apollo.BaseMutationOptions<AddTeamMutation, AddTeamMutationVariables>;
export const AllTeamsDocument = gql`
    query AllTeams {
  allTeams {
    name
  }
}
    `;

/**
 * __useAllTeamsQuery__
 *
 * To run a query within a React component, call `useAllTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllTeamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllTeamsQuery(baseOptions?: Apollo.QueryHookOptions<AllTeamsQuery, AllTeamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllTeamsQuery, AllTeamsQueryVariables>(AllTeamsDocument, options);
      }
export function useAllTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllTeamsQuery, AllTeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllTeamsQuery, AllTeamsQueryVariables>(AllTeamsDocument, options);
        }
export type AllTeamsQueryHookResult = ReturnType<typeof useAllTeamsQuery>;
export type AllTeamsLazyQueryHookResult = ReturnType<typeof useAllTeamsLazyQuery>;
export type AllTeamsQueryResult = Apollo.QueryResult<AllTeamsQuery, AllTeamsQueryVariables>;
export const AllUsersDocument = gql`
    query AllUsers($page: Float) {
  allUsers(page: $page) {
    total
    users {
      id
      email
      firstName
      lastName
      startDate
      teams {
        name
      }
      workPatterns {
        startDate
        endDate
        repeatsOn
        patternDetails {
          type
          startDate
          endDate
          rRule
        }
      }
      isAdmin
    }
  }
}
    `;

/**
 * __useAllUsersQuery__
 *
 * To run a query within a React component, call `useAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllUsersQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
      }
export function useAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
        }
export type AllUsersQueryHookResult = ReturnType<typeof useAllUsersQuery>;
export type AllUsersLazyQueryHookResult = ReturnType<typeof useAllUsersLazyQuery>;
export type AllUsersQueryResult = Apollo.QueryResult<AllUsersQuery, AllUsersQueryVariables>;
export const ChangeForgottenPasswordDocument = gql`
    mutation ChangeForgottenPassword($newPassword: String!, $token: String!) {
  changeForgottenPassword(newPassword: $newPassword, token: $token)
}
    `;
export type ChangeForgottenPasswordMutationFn = Apollo.MutationFunction<ChangeForgottenPasswordMutation, ChangeForgottenPasswordMutationVariables>;

/**
 * __useChangeForgottenPasswordMutation__
 *
 * To run a mutation, you first call `useChangeForgottenPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeForgottenPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeForgottenPasswordMutation, { data, loading, error }] = useChangeForgottenPasswordMutation({
 *   variables: {
 *      newPassword: // value for 'newPassword'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useChangeForgottenPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangeForgottenPasswordMutation, ChangeForgottenPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeForgottenPasswordMutation, ChangeForgottenPasswordMutationVariables>(ChangeForgottenPasswordDocument, options);
      }
export type ChangeForgottenPasswordMutationHookResult = ReturnType<typeof useChangeForgottenPasswordMutation>;
export type ChangeForgottenPasswordMutationResult = Apollo.MutationResult<ChangeForgottenPasswordMutation>;
export type ChangeForgottenPasswordMutationOptions = Apollo.BaseMutationOptions<ChangeForgottenPasswordMutation, ChangeForgottenPasswordMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($currentPassword: String!, $newPassword: String!) {
  changePassword(currentPassword: $currentPassword, newPassword: $newPassword) {
    message
    isChanged
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      currentPassword: // value for 'currentPassword'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const DeletePatternDetailDocument = gql`
    mutation DeletePatternDetail($patternDetailId: Float!) {
  deletePatternDetail(patternDetailId: $patternDetailId)
}
    `;
export type DeletePatternDetailMutationFn = Apollo.MutationFunction<DeletePatternDetailMutation, DeletePatternDetailMutationVariables>;

/**
 * __useDeletePatternDetailMutation__
 *
 * To run a mutation, you first call `useDeletePatternDetailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePatternDetailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePatternDetailMutation, { data, loading, error }] = useDeletePatternDetailMutation({
 *   variables: {
 *      patternDetailId: // value for 'patternDetailId'
 *   },
 * });
 */
export function useDeletePatternDetailMutation(baseOptions?: Apollo.MutationHookOptions<DeletePatternDetailMutation, DeletePatternDetailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePatternDetailMutation, DeletePatternDetailMutationVariables>(DeletePatternDetailDocument, options);
      }
export type DeletePatternDetailMutationHookResult = ReturnType<typeof useDeletePatternDetailMutation>;
export type DeletePatternDetailMutationResult = Apollo.MutationResult<DeletePatternDetailMutation>;
export type DeletePatternDetailMutationOptions = Apollo.BaseMutationOptions<DeletePatternDetailMutation, DeletePatternDetailMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($id: Float!) {
  deletePost(id: $id)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const DeleteTeamDocument = gql`
    mutation deleteTeam($name: String!) {
  deleteTeam(name: $name)
}
    `;
export type DeleteTeamMutationFn = Apollo.MutationFunction<DeleteTeamMutation, DeleteTeamMutationVariables>;

/**
 * __useDeleteTeamMutation__
 *
 * To run a mutation, you first call `useDeleteTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTeamMutation, { data, loading, error }] = useDeleteTeamMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useDeleteTeamMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTeamMutation, DeleteTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTeamMutation, DeleteTeamMutationVariables>(DeleteTeamDocument, options);
      }
export type DeleteTeamMutationHookResult = ReturnType<typeof useDeleteTeamMutation>;
export type DeleteTeamMutationResult = Apollo.MutationResult<DeleteTeamMutation>;
export type DeleteTeamMutationOptions = Apollo.BaseMutationOptions<DeleteTeamMutation, DeleteTeamMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($userId: Float!) {
  deleteUser(userId: $userId)
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const EditPatternDetailDocument = gql`
    mutation EditPatternDetail($exDate: String, $rRule: String, $patternDetailId: Float!, $endDate: String!, $startDate: String!, $type: Float) {
  editPatternDetail(
    patternDetailId: $patternDetailId
    startDate: $startDate
    endDate: $endDate
    rRule: $rRule
    exDate: $exDate
    type: $type
  )
}
    `;
export type EditPatternDetailMutationFn = Apollo.MutationFunction<EditPatternDetailMutation, EditPatternDetailMutationVariables>;

/**
 * __useEditPatternDetailMutation__
 *
 * To run a mutation, you first call `useEditPatternDetailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPatternDetailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPatternDetailMutation, { data, loading, error }] = useEditPatternDetailMutation({
 *   variables: {
 *      exDate: // value for 'exDate'
 *      rRule: // value for 'rRule'
 *      patternDetailId: // value for 'patternDetailId'
 *      endDate: // value for 'endDate'
 *      startDate: // value for 'startDate'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useEditPatternDetailMutation(baseOptions?: Apollo.MutationHookOptions<EditPatternDetailMutation, EditPatternDetailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditPatternDetailMutation, EditPatternDetailMutationVariables>(EditPatternDetailDocument, options);
      }
export type EditPatternDetailMutationHookResult = ReturnType<typeof useEditPatternDetailMutation>;
export type EditPatternDetailMutationResult = Apollo.MutationResult<EditPatternDetailMutation>;
export type EditPatternDetailMutationOptions = Apollo.BaseMutationOptions<EditPatternDetailMutation, EditPatternDetailMutationVariables>;
export const EditUserDocument = gql`
    mutation EditUser($userId: Float!, $email: String!, $firstName: String!, $lastName: String!, $isAdmin: Boolean!, $startDate: DateTime!, $teams: [TeamInputType!], $workPatterns: [WorkPatternsInputType!]!) {
  editUser(
    email: $email
    firstName: $firstName
    lastName: $lastName
    isAdmin: $isAdmin
    startDate: $startDate
    workPatterns: $workPatterns
    teams: $teams
    userId: $userId
  )
}
    `;
export type EditUserMutationFn = Apollo.MutationFunction<EditUserMutation, EditUserMutationVariables>;

/**
 * __useEditUserMutation__
 *
 * To run a mutation, you first call `useEditUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editUserMutation, { data, loading, error }] = useEditUserMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      email: // value for 'email'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      isAdmin: // value for 'isAdmin'
 *      startDate: // value for 'startDate'
 *      teams: // value for 'teams'
 *      workPatterns: // value for 'workPatterns'
 *   },
 * });
 */
export function useEditUserMutation(baseOptions?: Apollo.MutationHookOptions<EditUserMutation, EditUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditUserMutation, EditUserMutationVariables>(EditUserDocument, options);
      }
export type EditUserMutationHookResult = ReturnType<typeof useEditUserMutation>;
export type EditUserMutationResult = Apollo.MutationResult<EditUserMutation>;
export type EditUserMutationOptions = Apollo.BaseMutationOptions<EditUserMutation, EditUserMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, options);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const GetPostsDocument = gql`
    query GetPosts($page: Float, $perPage: Float) {
  getPosts(page: $page, perPage: $perPage) {
    total
    posts {
      id
      content
      date
      user {
        id
        firstName
        lastName
      }
    }
  }
}
    `;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
      }
export function useGetPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;
export const GetScheduleDocument = gql`
    query GetSchedule($page: Float, $perPage: Float) {
  getSchedule(page: $page, perPage: $perPage) {
    total
    appointments {
      id
      userId
      rRule
      startDate
      endDate
      exDate
      type
      workPatternId
      patternDetailId
    }
    resources {
      title
      fieldName
      instances {
        id
        text
        color
      }
    }
  }
}
    `;

/**
 * __useGetScheduleQuery__
 *
 * To run a query within a React component, call `useGetScheduleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetScheduleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetScheduleQuery({
 *   variables: {
 *      page: // value for 'page'
 *      perPage: // value for 'perPage'
 *   },
 * });
 */
export function useGetScheduleQuery(baseOptions?: Apollo.QueryHookOptions<GetScheduleQuery, GetScheduleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetScheduleQuery, GetScheduleQueryVariables>(GetScheduleDocument, options);
      }
export function useGetScheduleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetScheduleQuery, GetScheduleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetScheduleQuery, GetScheduleQueryVariables>(GetScheduleDocument, options);
        }
export type GetScheduleQueryHookResult = ReturnType<typeof useGetScheduleQuery>;
export type GetScheduleLazyQueryHookResult = ReturnType<typeof useGetScheduleLazyQuery>;
export type GetScheduleQueryResult = Apollo.QueryResult<GetScheduleQuery, GetScheduleQueryVariables>;
export const GetUnseenPostsNumberDocument = gql`
    query GetUnseenPostsNumber {
  getUnseenPostsNumber
}
    `;

/**
 * __useGetUnseenPostsNumberQuery__
 *
 * To run a query within a React component, call `useGetUnseenPostsNumberQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnseenPostsNumberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnseenPostsNumberQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUnseenPostsNumberQuery(baseOptions?: Apollo.QueryHookOptions<GetUnseenPostsNumberQuery, GetUnseenPostsNumberQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUnseenPostsNumberQuery, GetUnseenPostsNumberQueryVariables>(GetUnseenPostsNumberDocument, options);
      }
export function useGetUnseenPostsNumberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUnseenPostsNumberQuery, GetUnseenPostsNumberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUnseenPostsNumberQuery, GetUnseenPostsNumberQueryVariables>(GetUnseenPostsNumberDocument, options);
        }
export type GetUnseenPostsNumberQueryHookResult = ReturnType<typeof useGetUnseenPostsNumberQuery>;
export type GetUnseenPostsNumberLazyQueryHookResult = ReturnType<typeof useGetUnseenPostsNumberLazyQuery>;
export type GetUnseenPostsNumberQueryResult = Apollo.QueryResult<GetUnseenPostsNumberQuery, GetUnseenPostsNumberQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    user {
      id
      email
      isAdmin
      company {
        id
        name
      }
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    email
    isAdmin
    company {
      id
      name
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $firstName: String!, $lastName: String!, $companyName: String!) {
  register(
    email: $email
    password: $password
    firstName: $firstName
    lastName: $lastName
    companyName: $companyName
  )
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      companyName: // value for 'companyName'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const RegisterUserDocument = gql`
    mutation RegisterUser($email: String!, $firstName: String!, $lastName: String!, $isAdmin: Boolean!, $startDate: DateTime!, $teams: [TeamInputType!], $workPatterns: [WorkPatternsInputType!]!) {
  registerUser(
    email: $email
    firstName: $firstName
    lastName: $lastName
    isAdmin: $isAdmin
    startDate: $startDate
    workPatterns: $workPatterns
    teams: $teams
  )
}
    `;
export type RegisterUserMutationFn = Apollo.MutationFunction<RegisterUserMutation, RegisterUserMutationVariables>;

/**
 * __useRegisterUserMutation__
 *
 * To run a mutation, you first call `useRegisterUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerUserMutation, { data, loading, error }] = useRegisterUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      isAdmin: // value for 'isAdmin'
 *      startDate: // value for 'startDate'
 *      teams: // value for 'teams'
 *      workPatterns: // value for 'workPatterns'
 *   },
 * });
 */
export function useRegisterUserMutation(baseOptions?: Apollo.MutationHookOptions<RegisterUserMutation, RegisterUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterUserMutation, RegisterUserMutationVariables>(RegisterUserDocument, options);
      }
export type RegisterUserMutationHookResult = ReturnType<typeof useRegisterUserMutation>;
export type RegisterUserMutationResult = Apollo.MutationResult<RegisterUserMutation>;
export type RegisterUserMutationOptions = Apollo.BaseMutationOptions<RegisterUserMutation, RegisterUserMutationVariables>;