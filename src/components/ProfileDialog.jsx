import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "~/components/ui/tabs";
import { User } from "lucide-react";
import InfoTab from "~/components/Profile/InfoTab";
import PasswordTab from "~/components/Profile/PasswordTab";

export default function ProfileDialog({ open, onOpenChange }) {
  const handleClose = () => onOpenChange(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-[95%] p-6 rounded-2xl bg-white border border-[#e7e3dc] shadow-2xl font-sans text-sm">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-lg font-bold text-[#2c2520] flex items-center gap-2">
            <User className="w-5 h-5 text-[#704f38]" />
            Hồ sơ cá nhân
          </DialogTitle>
          <DialogDescription className="text-xs text-[#a08e81]">
            Cập nhật ảnh đại diện, thông tin tài khoản hoặc thay đổi mật khẩu của bạn.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-[#fdfbf7] p-1 rounded-xl border border-[#e7e3dc] mb-5 h-9">
            <TabsTrigger
              value="info"
              className="text-xs font-semibold rounded-lg text-[#70655d] data-[state=active]:bg-[#704f38] data-[state=active]:text-white transition-all cursor-pointer h-full py-0"
            >
              Thông tin cá nhân
            </TabsTrigger>
            <TabsTrigger
              value="password"
              className="text-xs font-semibold rounded-lg text-[#70655d] data-[state=active]:bg-[#704f38] data-[state=active]:text-white transition-all cursor-pointer h-full py-0"
            >
              Đổi mật khẩu
            </TabsTrigger>
          </TabsList>

          {/* TAB 1: UPDATE AVATAR & INFO */}
          <TabsContent value="info" className="space-y-4 outline-none">
            <InfoTab onClose={handleClose} />
          </TabsContent>

          {/* TAB 2: UPDATE PASSWORD */}
          <TabsContent value="password" className="space-y-4 outline-none">
            <PasswordTab onClose={handleClose} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
