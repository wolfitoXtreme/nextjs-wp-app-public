import { useForm, ValidationError } from "@formspree/react";

import { Input } from "components/Input";

// integration code at https://formspree.io/forms/{formId}/integration
export const FormSpreeForm = ({ formId }) => {
  const [state, handleSubmit] = useForm(formId);

  if (state.succeeded) {
    return <p>Thanks for joining!</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto my-5">
      <label htmlFor="email">Email Address</label>
      <Input id="email" type="email" name="email" />
      <ValidationError prefix="Email" field="email" errors={state.errors} />
      <textarea
        id="message"
        name="message"
        className="border-2 border-slate-400 p-1 hover:border-slate-500"
      />
      <ValidationError prefix="Message" field="message" errors={state.errors} />

      <div>
        <button
          type="submit"
          disabled={state.submitting}
          className="link-button"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
