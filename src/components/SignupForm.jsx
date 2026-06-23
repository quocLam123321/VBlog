import { cn } from '~/lib/utils'
import { Button } from '~/components/ui/button'
import { Card, CardContent } from '~/components/ui/card'
import { Field, FieldGroup, FieldLabel, FieldSeparator } from '~/components/ui/field'
import { Input } from '~/components/ui/input'
import { useForm } from 'react-hook-form'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, FIELD_REQUIRED_MESSAGE, PASSWORD_CONFIRMATION_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from '~/utils/validators'
import { FieldErrorAlert } from '~/components/FieldErrorAlert'
import { Mail, Lock, Eye, EyeOff, Kanban } from 'lucide-react'
import { useState } from 'react'
import { registerUserAPI } from '~/apis'
import { Spinner } from '~/components/ui/spinner'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

export function SignupForm({ className, ...props }) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, getValues } = useForm()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  const handleShowPassword = () => setShowPassword(!showPassword)
  const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword)

  const handleSubmitForm = async (data) => {
    console.log("🚀 ~ handleSubmitForm ~ data:", data)
    if (isSubmitting) return
    await toast.promise(
      registerUserAPI(data),
      { pending: 'Creating Account ....' },
      { position: 'bottom-right' }
    ).then(() => {
      toast.success('Account created successfully, Please Sign In!', { position: 'bottom-right' })
      navigate('/auth/login')
    }).catch((err) => {
      console.error(err)
    })
  }

  return (
    <div className={cn('flex flex-col gap-4 w-full max-w-105 mx-auto', className)} {...props}>
      <Card className="border border-slate-800/80 bg-slate-900/40 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.3)] rounded-2xl overflow-hidden relative z-10">
        <CardContent className="p-6 flex flex-col gap-5">
          {/* logo & header */}
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="h-10 w-10 text-indigo-500 bg-indigo-500/10 p-2 rounded-xl border border-indigo-500/20 flex items-center justify-center">
              <Kanban className="h-5.5 w-5.5 fill-indigo-500" />
            </div>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight bg-linear-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">Create your account</h1>
              <p className="text-sm text-slate-400">
                Enter your email below to create your account
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col gap-4">
            <FieldGroup className="gap-3.5">
              {/* email */}
              <Field className="space-y-1.5">
                <FieldLabel htmlFor="email" className="text-slate-300 text-xs font-semibold">Email address</FieldLabel>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <Input
                    id="email"
                    placeholder="name@company.com"
                    className="pl-10 bg-slate-950/30 border-slate-800 text-slate-200 placeholder:text-slate-500 focus-visible:border-indigo-500/80 focus-visible:ring-indigo-500/20 rounded-xl transition-all h-10"
                    {...register('email', {
                      required: FIELD_REQUIRED_MESSAGE,
                      pattern: {
                        value: EMAIL_RULE,
                        message: EMAIL_RULE_MESSAGE
                      }
                    })}
                  />
                </div>
                {errors.email && <FieldErrorAlert errorMessage={errors.email.message} />}
              </Field>

              {/* password */}
              <Field className="space-y-1.5">
                <FieldLabel htmlFor="password" className="text-slate-300 text-xs font-semibold">Password</FieldLabel>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="••••••••"
                    className="pl-10 pr-10 bg-slate-950/30 border-slate-800 text-slate-200 placeholder:text-slate-500 focus-visible:border-indigo-500/80 focus-visible:ring-indigo-500/20 rounded-xl transition-all h-10"
                    {...register('password', {
                      required: FIELD_REQUIRED_MESSAGE,
                      pattern: {
                        value: PASSWORD_RULE,
                        message: PASSWORD_RULE_MESSAGE
                      }
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
                    onClick={handleShowPassword}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <FieldErrorAlert errorMessage={errors.password.message} />}
              </Field>

              {/* confirm password */}
              <Field className="space-y-1.5">
                <FieldLabel htmlFor="confirm-password" className="text-slate-300 text-xs font-semibold">
                  Confirm Password
                </FieldLabel>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirm-password"
                    placeholder="••••••••"
                    className="pl-10 pr-10 bg-slate-950/30 border-slate-800 text-slate-200 placeholder:text-slate-500 focus-visible:border-indigo-500/80 focus-visible:ring-indigo-500/20 rounded-xl transition-all h-10"
                    {...register('confirm_password', {
                      required: FIELD_REQUIRED_MESSAGE,
                      validate: value => {
                        if (value === getValues('password')) return true
                        return PASSWORD_CONFIRMATION_MESSAGE
                      }
                    })}
                  />
                  <button
                    type="button"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
                    onClick={handleShowConfirmPassword}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirm_password && <FieldErrorAlert errorMessage={errors.confirm_password.message} />}
              </Field>

              {/* submit */}
              <div className="pt-1">
                {isSubmitting ? (
                  <Button disabled className="w-full bg-indigo-600/50 text-white/50 rounded-xl cursor-not-allowed h-10">
                    <Spinner className="mr-2 h-4 w-4" />
                    Creating Account...
                  </Button>
                ) : (
                  <Button type="submit" className="w-full bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-indigo-500/20 cursor-pointer transition-all duration-300 transform active:scale-[0.98] h-10">
                    Create Account
                  </Button>
                )}
              </div>

              {/* continue separator */}
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-slate-900/60 *:data-[slot=field-separator-content]:text-slate-400">
                Or continue with
              </FieldSeparator>

              {/* social buttons */}
              <div className="grid grid-cols-3 gap-3">
                <Button variant="outline" type="button" className="border-slate-800 bg-slate-950/20 hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer transition-all duration-200 rounded-xl h-10">
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" fill="currentColor" />
                  </svg>
                </Button>
                <Button variant="outline" type="button" className="border-slate-800 bg-slate-950/20 hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer transition-all duration-200 rounded-xl h-10">
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" fill="currentColor" />
                  </svg>
                </Button>
                <Button variant="outline" type="button" className="border-slate-800 bg-slate-950/20 hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer transition-all duration-200 rounded-xl h-10">
                  <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z" fill="currentColor" />
                  </svg>
                </Button>
              </div>
            </FieldGroup>
          </form>

          {/* footer */}
          <div className="text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-indigo-400 hover:text-indigo-300 font-semibold hover:underline transition-colors">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
      <div className="text-center text-xs text-slate-500 mt-2">
        By clicking continue, you agree to our{' '}
        <a href="#" className="hover:underline text-slate-400 transition-colors">Terms of Service</a> and{' '}
        <a href="#" className="hover:underline text-slate-400 transition-colors">Privacy Policy</a>.
      </div>
    </div>
  )
}
