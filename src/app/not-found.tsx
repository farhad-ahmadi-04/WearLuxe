import PrevButton from "@/components/ui/button/prevButton";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

function NotFound() {
  return (
    <Box className="flex flex-col justify-center items-center h-[calc(100dvh-150px)]">
      <Typography variant="h1" className="text-primary-950 text-9xl">
        404
      </Typography>
      <Typography>
        به نظر میرسه شما در فضا گم شدید و صفحه مورد نظرتون پیدا نشد!
      </Typography>
      <Link href="/">
        <PrevButton>بازگشت</PrevButton>
      </Link>
    </Box>
  );
}

export default NotFound;
