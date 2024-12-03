import { PrismaClient } from "@prisma/client"
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()
const saltRound = 10

async function main() {
    await prisma.user.create({
        data: {
            email: 'admin@gmail.com',
            password: await bcrypt.hash('123123', saltRound),
            name: 'Yusuf Fadilah Rukmana',
            role: 'ADMIN',
            profilePicture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
        }
    })
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });