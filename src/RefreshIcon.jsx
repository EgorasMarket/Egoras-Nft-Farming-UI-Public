import React, { useEffect, useRef, useState } from "react";

export const RefreshIcon = ({
  callGetAmountsOut,
  SwapAmount,
  MinamountsOut,
}) => {
  const animateElementRef = useRef(null);
  let previousTime = 0;

  useEffect(() => {
    if (SwapAmount > "0") {
      const animateElement = animateElementRef.current;
      const checkAnimationTime = () => {
        const currentTime = animateElement.getCurrentTime();
        if (
          currentTime >= 10 &&
          Math.floor(currentTime / 10) > Math.floor(previousTime / 10)
        ) {
          // console.log(
          //   "Animation reached",
          //   Math.floor(currentTime / 10) * 10,
          //   "seconds"
          // );
          callGetAmountsOut();
        }
        previousTime = currentTime;
      };

      const intervalId = setInterval(checkAnimationTime, 500);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [SwapAmount, MinamountsOut]);

  return (
    <svg
      _ngcontent-qbv-c454=""
      id="arrow_loading"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="-6 -6 36 36"
      className="arrow-loading"
      width="36"
      height="36"
    >
      <path
        _ngcontent-qbv-c454=""
        stroke="none"
        fill="#5b5b5b"
        d="M16.2751 7.78995C13.932 5.44681 10.133 5.44681 7.78986 7.78995C7.02853 8.55128 6.51457 9.4663 6.24798 10.4351C6.24473 10.4499 6.24114 10.4646 6.23719 10.4793C6.17635 10.7064 6.12938 10.9339 6.09577 11.161C5.83159 12.9457 6.39255 14.7026 7.52624 15.9944C7.61054 16.0901 7.69842 16.1838 7.78986 16.2752C8.08307 16.5685 8.39909 16.825 8.7322 17.0448C9.25533 17.3892 9.84172 17.6568 10.4798 17.8278C10.7386 17.8971 10.9979 17.9484 11.2565 17.9825C12.9537 18.2061 14.6187 17.6866 15.8747 16.6415C16.0123 16.5265 16.1459 16.4044 16.2751 16.2752C16.2848 16.2655 16.2947 16.2561 16.3047 16.2469C17.0123 15.531 17.5491 14.627 17.8283 13.5851C17.9712 13.0517 18.5196 12.7351 19.053 12.878C19.5865 13.021 19.9031 13.5693 19.7602 14.1028C19.3141 15.7676 18.3745 17.1684 17.1409 18.1899C16.1883 18.9822 15.0949 19.5189 13.9515 19.8002C11.8607 20.3147 9.6028 19.9749 7.7328 18.7809C7.06855 18.3579 6.47841 17.8432 5.97519 17.2589C5.12341 16.2738 4.55173 15.1302 4.26015 13.9324C4.01698 12.9416 3.96104 11.8931 4.12168 10.8379C4.36697 9.20484 5.1183 7.63309 6.37564 6.37574C9.49984 3.25154 14.5652 3.25154 17.6894 6.37574L18.2332 6.91959L18.2337 5.49951C18.2338 5.05769 18.5921 4.69964 19.034 4.69979C19.4758 4.69995 19.8338 5.05825 19.8337 5.50007L19.8325 9.03277L19.8322 9.8325L19.0325 9.83249L18.9401 9.83249C18.8146 9.85665 18.6854 9.85665 18.5599 9.83248L15.5005 9.83245C15.0587 9.83245 14.7005 9.47427 14.7005 9.03244C14.7005 8.59062 15.0587 8.23245 15.5005 8.23245L16.7176 8.23246L16.2751 7.78995Z"
        class="background-path"
      ></path>
      <defs _ngcontent-qbv-c454="">
        <path
          _ngcontent-qbv-c454=""
          id="arrow"
          stroke="none"
          fill="none"
          d="M16.2751 7.78995C13.932 5.44681 10.133 5.44681 7.78986 7.78995C7.02853 8.55128 6.51457 9.4663 6.24798 10.4351C6.24473 10.4499 6.24114 10.4646 6.23719 10.4793C6.17635 10.7064 6.12938 10.9339 6.09577 11.161C5.83159 12.9457 6.39255 14.7026 7.52624 15.9944C7.61054 16.0901 7.69842 16.1838 7.78986 16.2752C8.08307 16.5685 8.39909 16.825 8.7322 17.0448C9.25533 17.3892 9.84172 17.6568 10.4798 17.8278C10.7386 17.8971 10.9979 17.9484 11.2565 17.9825C12.9537 18.2061 14.6187 17.6866 15.8747 16.6415C16.0123 16.5265 16.1459 16.4044 16.2751 16.2752C16.2848 16.2655 16.2947 16.2561 16.3047 16.2469C17.0123 15.531 17.5491 14.627 17.8283 13.5851C17.9712 13.0517 18.5196 12.7351 19.053 12.878C19.5865 13.021 19.9031 13.5693 19.7602 14.1028C19.3141 15.7676 18.3745 17.1684 17.1409 18.1899C16.1883 18.9822 15.0949 19.5189 13.9515 19.8002C11.8607 20.3147 9.6028 19.9749 7.7328 18.7809C7.06855 18.3579 6.47841 17.8432 5.97519 17.2589C5.12341 16.2738 4.55173 15.1302 4.26015 13.9324C4.01698 12.9416 3.96104 11.8931 4.12168 10.8379C4.36697 9.20484 5.1183 7.63309 6.37564 6.37574C9.49984 3.25154 14.5652 3.25154 17.6894 6.37574L18.2332 6.91959L18.2337 5.49951C18.2338 5.05769 18.5921 4.69964 19.034 4.69979C19.4758 4.69995 19.8338 5.05825 19.8337 5.50007L19.8325 9.03277L19.8322 9.8325L19.0325 9.83249L18.9401 9.83249C18.8146 9.85665 18.6854 9.85665 18.5599 9.83248L15.5005 9.83245C15.0587 9.83245 14.7005 9.47427 14.7005 9.03244C14.7005 8.59062 15.0587 8.23245 15.5005 8.23245L16.7176 8.23246L16.2751 7.78995Z"
        ></path>
        <clipPath _ngcontent-qbv-c454="" id="arrow-clip">
          <use _ngcontent-qbv-c454="" href="#arrow"></use>
        </clipPath>
      </defs>
      <g _ngcontent-qbv-c454="" clip-path="url(#arrow-clip)">
        <circle
          _ngcontent-qbv-c454=""
          cx="12"
          cy="12"
          r="5"
          transform="rotate(365,12,12)"
          fill="none"
          stroke="currentColor"
          stroke-width="16"
          stroke-dasharray="30"
          stroke-dashoffset="0"
          color="#cec3ea"
        >
          <animate
            ref={animateElementRef}
            attributeName="stroke-dashoffset"
            values="0;-30"
            begin=" 0s"
            repeatCount="indefinite"
            dur="10s"
          ></animate>
        </circle>
      </g>
      <use _ngcontent-qbv-c454="" href="#arrow"></use>
      {/* <animateTransform
        _ngcontent-qbv-c454=""
        id="transform_0"
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        from="0 0 0"
        to="-10 0 0"
        dur="0.07s"
        begin="arrow_loading.click;"
        repeatCount="1"
      ></animateTransform>
      <animateTransform
        _ngcontent-qbv-c454=""
        id="transform_1"
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        from="-45 0 0"
        to="390 0 0"
        dur="0.6s"
        begin="transform_0.end"
        repeatCount="1"
      ></animateTransform>
      <animateTransform
        _ngcontent-qbv-c454=""
        id="transform_2"
        attributeName="transform"
        attributeType="XML"
        type="rotate"
        from="390 0 0"
        to="360 0 0"
        dur="0.15s"
        begin="transform_1.end"
        repeatCount="1"
      ></animateTransform> */}
    </svg>
  );
};
