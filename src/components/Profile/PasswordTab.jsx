import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserProfileAPI } from "~/redux/user/userSlice";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { toast } from "react-toastify";
import { Key, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
  PASSWORD_CONFIRMATION_MESSAGE,
} from "~/utils/validators";
import { FieldErrorAlert } from "~/components/FieldErrorAlert";

export default function PasswordTab({ onClose }) {
  const dispatch = useDispatch();
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleUpdatePassword = async (data) => {
    setLoadingPassword(true);
    toast.promise(
      dispatch(updateUserProfileAPI({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      })),
      { pending: "Updating password..." }
    ).then((res) => {
      if (!res.error) {
        toast.success("Password updated successfully!", { theme: "colored" });
        reset();
      }
    }).finally(() => {
      setLoadingPassword(false);
    });
  };

  return (
    <form onSubmit={handleSubmit(handleUpdatePassword)} className="space-y-4">
      {/* Current Password */}
      <div className="space-y-1.5">
        <Label htmlFor="currentPassword" className="text-xs font-semibold text-[#70655d]">
          Mật khẩu hiện tại
        </Label>
        <div className="relative">
          <Input
            id="currentPassword"
            type={showCurrentPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("currentPassword", {
              required: FIELD_REQUIRED_MESSAGE,
            })}
            className="border-[#e7e3dc] focus-visible:border-[#704f38] focus-visible:ring-[#704f38]/20 text-xs h-9 pr-10"
          />
          <button
            type="button"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#a08e81] hover:text-[#704f38] cursor-pointer"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
          >
            {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.currentPassword && (
          <FieldErrorAlert errorMessage={errors.currentPassword.message} />
        )}
      </div>

      {/* New Password */}
      <div className="space-y-1.5">
        <Label htmlFor="newPassword" className="text-xs font-semibold text-[#70655d]">
          Mật khẩu mới
        </Label>
        <div className="relative">
          <Input
            id="newPassword"
            type={showNewPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("newPassword", {
              required: FIELD_REQUIRED_MESSAGE,
              pattern: {
                value: PASSWORD_RULE,
                message: PASSWORD_RULE_MESSAGE,
              },
              validate: (value, formValues) =>
                value !== formValues.currentPassword ||
                "Mật khẩu mới không được trùng với mật khẩu hiện tại!",
            })}
            className="border-[#e7e3dc] focus-visible:border-[#704f38] focus-visible:ring-[#704f38]/20 text-xs h-9 pr-10"
          />
          <button
            type="button"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#a08e81] hover:text-[#704f38] cursor-pointer"
            onClick={() => setShowNewPassword(!showNewPassword)}
          >
            {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.newPassword && (
          <FieldErrorAlert errorMessage={errors.newPassword.message} />
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-1.5">
        <Label htmlFor="confirmPassword" className="text-xs font-semibold text-[#70655d]">
          Xác nhận mật khẩu mới
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("confirmPassword", {
              required: FIELD_REQUIRED_MESSAGE,
              validate: (value, formValues) =>
                value === formValues.newPassword ||
                PASSWORD_CONFIRMATION_MESSAGE,
            })}
            className="border-[#e7e3dc] focus-visible:border-[#704f38] focus-visible:ring-[#704f38]/20 text-xs h-9 pr-10"
          />
          <button
            type="button"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#a08e81] hover:text-[#704f38] cursor-pointer"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.confirmPassword && (
          <FieldErrorAlert errorMessage={errors.confirmPassword.message} />
        )}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onClose}
          className="border-[#e7e3dc] hover:bg-[#fdfbf7] text-xs h-9 px-4 rounded-xl cursor-pointer"
        >
          Hủy
        </Button>
        <Button
          type="submit"
          disabled={loadingPassword}
          className="bg-[#704f38] hover:bg-[#5a3f2c] text-white text-xs h-9 px-4 rounded-xl cursor-pointer flex items-center gap-1.5"
        >
          <Key className="w-3.5 h-3.5" />
          {loadingPassword ? "Đang cập nhật..." : "Cập nhật mật khẩu"}
        </Button>
      </div>
    </form>
  );
}
