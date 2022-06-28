import PropTypes from "prop-types";
import styled from "styled-components";
import useInput from "../_hooks/UseInput";

const Form = styled.form`
  max-width: 250px;
  height: 75%;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 100px;
  gap: 20px;
`;

const FormTitle = styled.h2`
  text-align: center;
`;

const Input = styled.input`
  border-radius: 4px;
  padding: 2px 5px;
  width: 100%;
`;

const InputCheck = styled.div`
  margin-left: auto;
  margin-top: -15px;
  /* width: 100%; */
  margin-right: -5px;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
`;

const Button = styled.button`
  width: 100%;
  padding: 3px 10px;
  border-radius: 5px;
`;

const Link = styled.a`
  font-size: 10px;
  margin: auto;
`;

const QuestionWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin-bottom: 5px; */
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;
`;

const Label = styled.label`
  margin-right: auto;
  margin-left: -5px;
`;

async function loginUser(credentials) {
  return fetch("http://localhost:8080/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
}

const Login = ({ setToken }) => {
  const [email, setEmail] = useInput("");
  const [password, setPassword] = useInput("");
  const [remember, setRemember] = useInput(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password,
    });
    setToken(token);
    console.log(email, password);
  };
  function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log("Name: " + profile.getName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormTitle>Login</FormTitle>
      <Wrapper>
        <Label htmlFor="email">Email</Label>
        <Input
          placeholder="Example@email.com"
          name="email"
          type="email"
          value={email}
          onChange={setEmail}
        />
      </Wrapper>
      <Wrapper>
        <Label htmlFor="password">Password</Label>
        <Input
          placeholder="********"
          name="password"
          type="password"
          value={password}
          onChange={setPassword}
        />
      </Wrapper>
      <Wrapper>
        <InputCheck>
          <Label htmlFor="remember-me">Remember Me</Label>
          <Input
            type="checkbox"
            name="remember-me"
            value={remember}
            onChange={setRemember}
          />
        </InputCheck>
        <div className="g-signin2" data-onsuccess="onSignIn" />
      </Wrapper>
      <QuestionWrapper>
        <Link href="#">Forgot your password?</Link>
        <Link href="#">Don't have an account?</Link>
      </QuestionWrapper>
      <Wrapper>
        <Button>Submit</Button>
      </Wrapper>
    </Form>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
