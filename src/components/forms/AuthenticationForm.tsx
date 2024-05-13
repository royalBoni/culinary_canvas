"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { loginUser } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { Button } from "../button";
import { Check, ArrowRight } from "lucide-react";
import { UseUserContext } from "@/app/store/userContext";
import { useAlertDialogContext } from "@/app/store/alertDialogContext";

/* import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod'; */

/* import { movieTypeTypes } from '@/app/page';
import { type MovieFormSchema, movieFormSchema } from '@/schema/movie'; */

/* import { Select } from './select'; */
import { FormTextField } from "../form-fields";

export type defaultValueType = {
  id: string;
  name?: string;
  type?: string;
};

/* interface FormComponentProps {
	movieTypes: movieTypeTypes | undefined;
	defaultVal?: defaultValueType;
} */

export type CheftLoginOrSignUpType = {
  name?: string;
  email: string;
  password: string;
  consfirmPassword?: string;
};

const FormComponent =
  (/* { movieTypes, defaultVal }: FormComponentProps */) => {
    const methods = useForm({});

    const { loggedInUser } = UseUserContext();
    const { openOrCloseAlertDialog } = useAlertDialogContext();

    const [formOperationState, setFormOperationState] =
      useState<string>("sign-up");

    /* const { mutate, isPending, isSuccess } = useMutation({
		mutationFn: (newPost: MovieFormSchema) =>
			fetch(defaultVal?.id ? `/api/movie/${defaultVal?.id}` : '/api/movie/', {
				method: defaultVal?.id ? 'PUT' : 'POST',
				headers: { 'Content-type': 'application/json; charset=UTF-8' },
				body: JSON.stringify(newPost)
			}).then(res => res.json)
	}); */

    const onSubmit = (data: CheftLoginOrSignUpType) => {
      /* mutate(data); */
      if (formOperationState === "sign-up") {
        console.log(`you are signing up with ${JSON.stringify(data)}`);
      } else {
        const user = loginUser(data);
        loggedInUser(user);
        openOrCloseAlertDialog(false);
        console.log(`you are signing in with ${JSON.stringify(user)}`);
      }
    };
    /*

	if (isSuccess) {
		router.push('/movies');
	}
 */
    return (
      <div className="flex justify-center items-center h-5/6 w-4/5 font-serif">
        <div className="w-1/2 bg-pink-500 h-full flex flex-col justify-center gap-4 p-14 text-white rounded-l-2xl">
          <p className="text-5xl font-bold">Fun starts here</p>
          <div className="text-xl font-semibold flex flex-col gap-4 text-black">
            <p className="flex gap-3 items-center">
              <Check className="text-gray-500" /> Many categories to explore
            </p>
            <p className="flex gap-3 items-center">
              <Check className="text-gray-500" /> Access top chefs across the
              globe and their top recipes
            </p>
            <p className="flex gap-3 items-center">
              <Check className="text-gray-500" /> Exhibit your cooking skills in
              a very fun way
            </p>
            <p className="flex gap-3 items-center">
              <Check className="text-gray-500" /> Interact with like minded
              people
            </p>
          </div>
          {/*  <div className="flex justify-center items-center">
            <Image
              src={"/no-bg.png"}
              alt="form image"
              width={250}
              height={200}
            ></Image>
          </div> */}
        </div>

        <div className="bg-black w-1/2 h-full text-pink-500 flex flex-col gap-2 p-14 rounded-r-2xl overflow-y-scroll">
          <h1 className="text-5xl font-bold">
            {formOperationState === "sign-up"
              ? "Create a new account"
              : "Login in with details"}
          </h1>

          {formOperationState === "sign-up" ? (
            <p>
              Already have an account?{" "}
              <span
                className="text-gray-500 hover:text-white"
                onClick={() => setFormOperationState("sign-in")}
              >
                Sign in
              </span>
            </p>
          ) : (
            <p>
              You don't have an account?
              <span
                className="text-gray-500 hover:text-white"
                onClick={() => setFormOperationState("sign-up")}
              >
                Sign up
              </span>
            </p>
          )}

          <div className="flex gap-5">
            <Button className="hover:bg-gray-600 cursor-pointer bg-gray-500 p-3 text-white items-center rounded-xl flex gap-3">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-blue-800"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
              </svg>
              Facebook
            </Button>{" "}
            <Button className="hover:bg-gray-600 cursor-pointer bg-gray-500 p-3 text-white items-center rounded-xl flex gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
              Google
            </Button>{" "}
            <Button className="hover:bg-gray-600 cursor-pointer bg-gray-500 p-3 text-white items-center rounded-xl flex gap-3">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-black"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Github
            </Button>
          </div>

          <div className="text-center font-bold">OR</div>

          <FormProvider {...methods}>
            <form
              className="flex w-full flex-col gap-3"
              onSubmit={methods.handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-5">
                {formOperationState === "sign-up" && (
                  <FormTextField
                    name="name"
                    label="Full name"
                    placeholder="Full name"
                    type="text"
                    /*   validateFn={(value) => {
                      if (value.length < 4) {
                        return "Username should contain atleast 5 character(s)";
                      }
                      return;
                    }} */
                  />
                )}
                <FormTextField
                  name="email"
                  label="Email"
                  placeholder="Full name"
                  type="email"
                  /*  validateFn={(value) => {
                    if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                      return "Please provide a valid email eg:boni@gmail.com";
                    }
                    return;
                  }} */
                />{" "}
                <FormTextField
                  name="password"
                  label="Password"
                  placeholder="Password"
                  type="password"
                />{" "}
                {formOperationState === "sign-up" && (
                  <FormTextField
                    name="confirm password"
                    label="Confirm Password"
                    placeholder="Confirm password"
                    type="password"
                  />
                )}
                {/* {methods.formState.errors.name && (
								<p className="text-red-600">
									{methods.formState.errors.}
								</p>
							)} */}
              </div>

              {/* <div className="flex flex-col gap-2">
							<label htmlFor="type">Type</label>

							<Suspense>
								<Select name="type" options={movieTypes} />
							</Suspense>
							<Suspense>
								<Select
									options={movieTypes ? movieTypes : undefined}
									name="type"
								/>
							</Suspense>
						</div> */}

              {/* <button
                className="w-96 rounded-md py-1 text-white bg-blue-500"
                type="submit"
              >
                submit
                {isPending ? 'Submitting' : 'Submit'}
              </button> */}
              <div className="flex justify-between">
                <Button>
                  {formOperationState === "sign-up" ? "Sign up" : "Sign in"}
                </Button>{" "}
                <div
                  className="flex gap-3 items-center cursor-pointer hover:text-gray-500"
                  onClick={() => openOrCloseAlertDialog(false)}
                >
                  Continue as Guest <ArrowRight />
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    );
  };

export default FormComponent;
