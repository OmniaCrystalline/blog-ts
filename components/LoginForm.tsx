/** @format */

const LoginForm = () => {
  return (
      <div className="grid place-content-center gap-5 mt-5">
        <form action="/signupEmail" className="grid gap-2 border-b-2 p-0 pb-5">
          <input type='email' placeholder='email'></input>
          <input type='password' placeholder='password'></input>
          <button>submit</button>
        </form>
      </div>
  );
};

export default LoginForm;


