import { Button, Flex, Stack, useToast } from "@chakra-ui/react";

import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { Input } from "../components/Form/Input";
import { useRouter } from "next/router";

type SignInFormData = {
  email: string;
  password: string;
  error?: FieldError;
};

const signInFormSchema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  password: yup.string().required("Senha obrigatória"),
});

export default function SignIn() {
  const { push } = useRouter();
  const toast = useToast();
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const handleSignIn: SubmitHandler<SignInFormData> = async (data, event) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const regex = /[^@]+/;
    const usuario = regex.exec(data.email)[0];
    toast({
      title: "Login realizado com sucesso.",
      description: `Sendo redirecionando para página Dashboard como ${usuario}.`,
      status: "success",
    });

    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 3500));
    push("/dashboard");
  };

  return (
    <Flex w={"100vw"} h={"100vh"} align={"center"} justify={"center"}>
      <Flex
        as={"form"}
        w={"100%"}
        maxW={360}
        bg="gray.800"
        p={8}
        borderRadius={8}
        flexDir={"column"}
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing={"4"}>
          <Input
            name="email"
            type={"email"}
            label="E-mail"
            error={formState.errors.email}
            {...register("email")}
          />
          <Input
            name="password"
            type={"password"}
            label="Senha"
            error={formState.errors.password}
            {...register("password")}
          />
        </Stack>
        <Button
          type={"submit"}
          mt={6}
          colorScheme={"pink"}
          size={"lg"}
          isLoading={formState.isSubmitting}
        >
          Entrar{" "}
        </Button>
      </Flex>
    </Flex>
  );
}
