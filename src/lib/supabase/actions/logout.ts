import { createClient } from "@/lib/supabase/client"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

async function signOut() {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    if (error) {
        throw error
    }

    if (error) {
        redirect('/error')
    }

    revalidatePath('/', 'layout')
    redirect('/auth/login')
}