import bunyan from "bunyan";

const log = bunyan.createLogger({
  name: "Todoist",
  stream: process.stdout,
});

export default log;
