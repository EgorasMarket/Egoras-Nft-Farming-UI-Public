import React from "react";
import "./Buttons.css";
export const LoginButton = (props) => {
  return (
    <>
      <a href={props.href}>
        <button className={`${props.className} LoginBtn`}>{props.txt}</button>
      </a>
    </>
  );
};
export const SignUpButton = (props) => {
  return (
    <>
      <a href={props.href}>
        <button className={`${props.className} LoginBtn`}>{props.txt}</button>
      </a>
    </>
  );
};
export const FunctionButton = (props) => {
  return (
    <>
      <button
        className={`${props.className}`}
        onClick={props.click}
        disabled={props.disabled}
      >
        {props.icon}
        {props.txt}
      </button>
    </>
  );
};
export const RegButton = (props) => {
  return (
    <>
      <a href={props.href}>
        <button className={`${props.className} LoginBtn`}>{props.txt}</button>
      </a>
    </>
  );
};
