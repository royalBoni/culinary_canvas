/* import React from "react";
import { useState } from "react";
import Image from "next/image";

export const returnUrl = (url: string) => {
  console.log(url);
  return url;
};



const DisplayImage = ({ url }: { url: string | void }) => {

    const [urlState, setUrlState] = useState('')
  return (
    <Image
      src={returnUrl()?returnUrl():''}
      alt=""
      width={400}
      height={400}
      className="object-cover"
    />
  );
};

export default DisplayImage;
 */
