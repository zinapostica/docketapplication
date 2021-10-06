import { makeStyles, MenuItem, Select } from "@material-ui/core";
const useStyles = makeStyles((theme: any) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    ...theme.typography.subtitle1,
    marginRight: theme.spacing(1),
    fontWeight: "bold"
  },
}));

export const ResourceSwitcher: React.FC<any> = ({
  mainResourceName,
  setMainResource,
  resources,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.text}>User:</div>
      <Select value={mainResourceName.text}>
        {resources.map((resource: any) => (
          <MenuItem
            key={resource.id}
            value={resource.text}
            onClick={() => {
              setMainResource(resource);
            }}
          >
            {resource.text}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};
