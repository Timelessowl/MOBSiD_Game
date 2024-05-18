/* eslint-disable */
import { Navigate } from "react-router-dom";
import React from "react";
import { AppRoute, AuthorizationStatus } from "../../const";

type Props = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
};

const PrivateRoute: React.FC<Props> = (props: Props) => {
  const { authorizationStatus, children } = props;
  console.log("PR debug massage");
  return authorizationStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Auth} />
  );
};

export default PrivateRoute;
