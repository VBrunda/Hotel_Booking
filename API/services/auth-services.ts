
import bcrypt from 'bcrypt';

export class AuthService {
    
    public static async encryptPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10); // Generate salt
        return await bcrypt.hash(password, salt); // Hash the password and return the result
    }

    public static matchPassword(password: string, dbpassword: string): boolean {
        return password === dbpassword;
        // return bcrypt.compareSync(password, dbpassword);
    }

    public static removePassword(response:any){
        const { password: _, ...userWithoutPassword } = response.toObject();
        return userWithoutPassword;
    }
}