import { useReducer, ChangeEvent, FormEvent, useState } from "react";
import { Button, Input } from "@/components/Elements";
import validator from "validator";

const Home = () => {
  const [formErrors, serFormErrors] = useState({});

  type UserType = {
    user: {
      email: {
        value: string,
        rules: string[],
        message: {
          "isEmpty"?: string,
          "isEmail"?: string
        }
      },
      password: {
        value: string,
        rules: string[],
        message: {
          "isEmpty"?: string,
        }
      }
    }
  }

  type ActionType = {
    type: string,
    payload: {
      name: string,
      value?: string
    }
  }

  // action constant
  const actions = {
    HANDLE_CHANGE: "handle_change",
  };

  // default state
  const initialState = {
    user: {
      email: {
        value: "",
        rules: ["isEmpty", "isEmail"],
        message: {
          "isEmpty": "Should not be empty",
          "isEmail": "Invalid email format"
        }
      },
      password: {
        value: "",
        rules: ["isEmpty"],
        message: {
          "isEmpty": "Should not be empty",
        }
      }
    }
  };

  // app reducer
  const reducer = (state: any, action: ActionType) => {
    const { name: field } = action.payload;
    const { user } = state;
    switch (action.type) {
      case actions.HANDLE_CHANGE:
        return {
          ...state,
          user: {
            ...user,
            [field]: {
              ...user[field],
              value: action.payload.value

            }
          }
        };
    }
    return state;
  };

  // 
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user } = state;

  // input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch({
      type: actions.HANDLE_CHANGE,
      payload: { name, value }
    });
  };

  const validateForm = (user: Record<string, any>) => {
    let fieldErrors: { [key: string]: string[] } = {};
    Object.keys(user).forEach(field => {
      const { value, rules, message } = user[field];
      const errors: string[] = [];
      rules?.forEach((rule: string) => {
        let errorMessage: string = "";
        switch (rule) {
          case "isEmpty":
            if (validator.isEmpty(value) === true) {
              errorMessage = message[rule];
            }
            break;
          case "isEmail":
            if (validator.isEmail(value) === false) {
              errorMessage = message[rule];
            }
        }
        if (errorMessage && message?.[rule]) {
          errors.push(errorMessage);
        }
        if (errors.length > 0) {
          fieldErrors[field] = errors;
        }
      });
    });
    return fieldErrors;
  };

  // form submission
  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const fe = validateForm(user);
    serFormErrors(fe);
  };

  return (
    <div className="home-page" >
      <form action="" onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="user-email">Email id</label>
          <Input
            type="Email id"
            placeholder="Email id"
            id="user-email"
            name="email"
            value={user.email.value}
            onChange={handleInputChange} />
          <span>{formErrors?.email?.[0]}</span>
        </div>

        <div>
          <label htmlFor="user-password">Password</label>
          <Input
            type="password"
            placeholder="Password"
            id="user-password"
            name="password"
            value={user.password.value}
            onChange={handleInputChange} />
          <span>{formErrors?.password?.[0]}</span>
        </div>

        <Button type="submit" label="submit" />
      </form>
    </div >
  );
};

export default Home;