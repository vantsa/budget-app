// rrd imports 
import { Form } from "react-router-dom"

// library imports
import { UserPlusIcon } from "@heroicons/react/24/solid"

//assets
import illustration from "../assets/illustration.png";

const Intro = () => {
  return (
    <div className="intro">
        <div>
            <h1>
                Take control of <span className="accent">Your Money</span>
            </h1>
            <p>
                Personal budgeting is the secret to the financial freedom. Start your journey today.
            </p>
            <Form method="post">
                <input 
                type="text" 
                name="userName" 
                req 
                placeholder="What is your name?" 
                aria-label="Your Name"
                autoComplete="given-name" />
                <input type="hidden" name="_action" value="newUser"/>
                <button type="submit" className="btn btn--dark">
                    <span>Create Account</span>
                    <UserPlusIcon width={20} />
                </button>
            </Form>
        </div>
        <img src={illustration} width={440} alt="Person with money" />
    </div>
  )
}

export default Intro