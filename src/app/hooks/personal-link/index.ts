import { useForm } from "../useForm";

export function usePersonalLink() {
  const formPersonalLink = useForm({
    modalPersonalLink: false,
  });

  return { formPersonalLink };
}
