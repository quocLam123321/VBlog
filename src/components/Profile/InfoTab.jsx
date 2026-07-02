import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectCurrentUser, updateUserProfileAPI } from '~/redux/user/userSlice'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Button } from '~/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '~/components/ui/avatar'
import { toast } from 'react-toastify'
import { Camera } from 'lucide-react'
import { useForm, useWatch } from 'react-hook-form'
import { FIELD_REQUIRED_MESSAGE, singleFileValidator } from '~/utils/validators'
import { FieldErrorAlert } from '~/components/FieldErrorAlert'

export default function InfoTab({ onClose }) {
  const currentUser = useSelector(selectCurrentUser)
  const dispatch = useDispatch()

  const [avatar, setAvatar] = useState(currentUser?.user?.avatar_url || '')
  const [loadingInfo, setLoadingInfo] = useState(false)
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm({
    defaultValues: {
      username: currentUser?.user?.user_name || ''
    }
  })

  const watchedUsername = useWatch({
    control,
    name: 'username',
    defaultValue: currentUser?.user?.user_name || ''
  })

  const handleAvatarUpload = (e) => {
    const currentFile = e.target.files?.[0]
    const error = singleFileValidator(currentFile)
    if (error) {
      console.error('Validation error:', error)
      toast.error(error)
      return
    }

    const reqData = new FormData()
    reqData.append('avatar', currentFile)

    // Cách để log được dữ liệu thông qua FormData
    // console.log('reqData: ', reqData)
    // for (const value of reqData.values()) {
    //   console.log('reqData Value: ', value)
    // }

    setIsUploadingAvatar(true)

    toast.promise(
      dispatch(updateUserProfileAPI(reqData)),
      { pending: 'Updating...' }
    ).then((res) => {
      if (!res.error) {
        toast.success('Your account has been updated successfully!', { theme: 'colored' })
        if (res.payload?.user?.avatar_url) {
          setAvatar(res.payload.user.avatar_url)
        }
      }
    }).finally(() => {
      setIsUploadingAvatar(false)
      e.target.value = ''
    })
  }

  const handleUpdateInfo = async (data) => {
    setLoadingInfo(true)
    toast.promise(
      dispatch(updateUserProfileAPI(data)),
      { pending: 'Updating information...' }
    ).then((res) => {
      if (!res.error) {
        toast.success('Username updated successfully!', { theme: 'colored' })
      }
    }).finally(() => {
      setLoadingInfo(false)
    })
  }

  return (
    <form onSubmit={handleSubmit(handleUpdateInfo)} className="space-y-4">
      {/* Avatar section */}
      <div className="flex flex-col items-center gap-3 pb-2">
        <div className="relative group">
          <Avatar className="w-32 h-32 size-32 border-2 border-[#e7e3dc]" style={{ width: '128px', height: '128px' }}>
            <AvatarImage
              src={avatar}
              alt="Avatar preview"
              className="w-full h-full object-cover"
            />
            <AvatarFallback className="bg-[#fdfbf7] text-[#70655d] text-3xl font-bold">
              {watchedUsername ? watchedUsername.charAt(0).toUpperCase() : 'U'}
            </AvatarFallback>
          </Avatar>
          <label className={`absolute bottom-1 right-1 p-2 bg-[#704f38] text-white rounded-full shadow-md transition-all ${
            isUploadingAvatar ? 'pointer-events-none opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-[#5a3f2c]'
          }`}>
            <Camera className="w-4 h-4" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
              disabled={isUploadingAvatar}
            />
          </label>
        </div>
        <span className="text-[11px] text-[#a08e81]">Click biểu tượng camera để tải ảnh lên</span>
      </div>

      {/* Email (Disabled) */}
      <div className="space-y-1.5">
        <Label htmlFor="email" className="text-xs font-semibold text-[#70655d]">
          Địa chỉ Email
        </Label>
        <Input
          id="email"
          type="email"
          value={currentUser?.user?.email || ''}
          disabled
          className="bg-[#fcfbfa] border-[#e7e3dc] text-xs h-9 cursor-not-allowed"
        />
      </div>

      {/* Username */}
      <div className="space-y-1.5">
        <Label htmlFor="username" className="text-xs font-semibold text-[#70655d]">
          Tên người dùng
        </Label>
        <Input
          id="username"
          type="text"
          placeholder="Nhập tên người dùng"
          {...register('username', {
            required: FIELD_REQUIRED_MESSAGE,
            validate: (value) =>
              value !== (currentUser?.user?.user_name || '') ||
              'Tên người dùng mới phải khác với tên hiện tại!'
          })}
          className="border-[#e7e3dc] focus-visible:border-[#704f38] focus-visible:ring-[#704f38]/20 text-xs h-9"
        />
        {errors.username && (
          <FieldErrorAlert errorMessage={errors.username.message} />
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
          disabled={loadingInfo}
          className="bg-[#704f38] hover:bg-[#5a3f2c] text-white text-xs h-9 px-4 rounded-xl cursor-pointer"
        >
          {loadingInfo ? 'Đang lưu...' : 'Lưu thay đổi'}
        </Button>
      </div>
    </form>
  )
}
