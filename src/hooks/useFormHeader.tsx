function useFormHeader(props: {
  formBehaviourType?: FormBehaviourType;
  forumObjectType?: ForumObjectType;
}): string | undefined {
  // form header for DefaultFormCard component
  let headerText = undefined;
  if (props.formBehaviourType) {
    if (props.formBehaviourType === "new") headerText = "Create";
    if (props.formBehaviourType === "edit") headerText = "Update";
    if (props.formBehaviourType === "login") headerText = "Login";
    if (props.formBehaviourType === "register") headerText = "Register";
  }
  if (props.forumObjectType) {
    if (props.forumObjectType === "comment") headerText += " Comment";
    if (props.forumObjectType === "post") headerText += " Post";
  }
  return headerText;
}

export default useFormHeader;
