import { useRouter } from "next/router";
import { FC } from "react";
import { useEffect } from "react";
import Loading from "../Loading/Loading"

const Push: FC<{href: string}> = ({ href }) => {
  const router = useRouter()
  useEffect(() => {
    router.push(href)
  }, [])
  
  return (
    <Loading />
  );
}

export default Push;