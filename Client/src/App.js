import React from "react";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import LogIn from "./components/log_in/index";
import SignUp from "./components/sign_up/index";
import Home from "./views/home";
import BlogPage from "./views/blog";
import NewBlogPost from "./views/new";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={LogIn} />
          <Route path="/signup" exact component={SignUp} />
          <Route path="/blogs/:id" exact component={BlogPage} />
          <Route path="/new" exact component={NewBlogPost} />
        </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
