import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupIcon from '@material-ui/icons/Group';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import PostAddIcon from '@material-ui/icons/PostAdd';
export const adminItems= [
  {
    text: "Manage users",
    icon: <GroupIcon />,
    redirect: "/manageUsers"
  },
  {
    text: "Add Announcement",
    icon: <PostAddIcon/>,
    redirect: "/home"
  },

] 

export const publicItems = [
  {
    text: "Calendar",
    icon: <DashboardIcon/>,
    redirect: "/calendar"
  },
  {
    text: "Announcements",
    icon: <RecordVoiceOverIcon />,
    redirect: "/announcements"
  },
] 
