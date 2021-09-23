import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { isAuthenticated } from "./Auth/Auth";
import { history } from "./history";
import AdminScreen from "./Pages/AdminScreen/";
import CreateProcess from "./Pages/CreateProcess";
import LoginScreen from "./Pages/LoginScreen";

const PrivateRoutes = ({ component: Component, ...prop }) => (
	<Route
		{...prop}
		render={(props) =>
			isAuthenticated() ? (
				<Component {...props} />
			) : (
				<Redirect to={{ pathname: "/login", state: { from: props.location } }} />
			)
		}
	/>
);

const Routes = () => (
	<BrowserRouter history={history}>
		<Switch>
			<Route exact path="/login" component={() => <LoginScreen />} />
			<PrivateRoutes path="/admin-page" component={() => <AdminScreen />} />
			<PrivateRoutes path="/criar-processo" component={() => <CreateProcess />} />
			<Route exact path="/" component={() => <LoginScreen />} />
		</Switch>
	</BrowserRouter>
);

export default Routes;