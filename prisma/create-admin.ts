import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";
import { hashPassword } from "../lib/password";

const [email, password, name = "Nexoventa Admin"] = process.argv.slice(2);

async function main() {
	if (!email || !password) throw new Error("Usage: npm run admin:create -- admin@example.com strong-password [name]");
	const connectionString = process.env.DATABASE_URL;
	if (!connectionString) throw new Error("DATABASE_URL is required.");
	const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

	try {
		await prisma.user.upsert({
			where: { email },
			update: { name, passwordHash: hashPassword(password), role: "ADMIN" },
			create: { email, name, passwordHash: hashPassword(password), role: "ADMIN" },
		});
		console.log(`Admin account ready for ${email}`);
	} finally {
		await prisma.$disconnect();
	}
}

main().catch((error: unknown) => {
	console.error("Admin creation failed:", error instanceof Error ? error.message : "Unknown error");
	process.exitCode = 1;
});
