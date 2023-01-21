/**
 * Unused hook - previously used to get the formheader
 * @param props 
 * @returns 
 */
export default function useFormHeader(props: {
  formBehaviourType?: FormBehaviourType;
}): string | undefined {
  // form header for DefaultFormCard component
  let headerText = undefined;
  if (props.formBehaviourType) {
    if (props.formBehaviourType === "new_post") headerText = "Create Post";
    if (props.formBehaviourType === "edit_post") headerText = "Update Post";
    if (props.formBehaviourType === "edit_comment") headerText = "Update Comment";
    if (props.formBehaviourType === "login") headerText = "Login";
    if (props.formBehaviourType === "register") headerText = "Register";
  }
  return headerText;
}