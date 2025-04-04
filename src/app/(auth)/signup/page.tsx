import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@radix-ui/react-label'
import { Mail } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { signup } from '../actions'
import { SubmitButton } from '@/components/submit-button'

export default function SignupPage() {
  return (
    <main className="container max-w-md mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[80vh]">
      <Card className="w-full">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Crear una Cuenta</CardTitle>
          <CardDescription className="text-center">Regístrate para una nueva cuenta usando correo electrónico y contraseña</CardDescription>
        </CardHeader>
        <form action={signup}>
          <CardContent className="space-y-4">
            {/* {message && (
              <Alert variant={message.type === "error" ? "destructive" : "default"}>
                <AlertDescription>{message.text}</AlertDescription>
              </Alert>
            )} */}

            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  name='email'
                  placeholder="tu@ejemplo.com"
                  className="pl-10"
                  required
                />
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  name='password'
                  placeholder="Tu contraseña"
                  className="mt-1 block w-full"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <SubmitButton
              text='Crear Cuenta'
            />
            <div className="text-center text-sm">
              <p className="text-muted-foreground">
                ¿Ya tienes una cuenta?{" "}
                <Link href="/login" className="text-primary hover:underline">
                  Inicia sesión
                </Link>
              </p>
            </div>
          </CardFooter>
        </form>
      </Card>
    </main>
  )
}
