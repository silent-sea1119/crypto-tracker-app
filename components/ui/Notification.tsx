import classes from "./Notification.module.scss";

const Notification = (props: { message: string }) => {
  const cssClasses = classes.notification;

  return (
    <section className={cssClasses}>
      <p className="center">{props.message}</p>
    </section>
  );
};

export default Notification;
