//src/utils/validators.ts

// (?=.*[a-z]): al menos una minúscula
// (?=.*[A-Z]): al menos una mayúscula
// (?=.*\d): al menos un número
// . {8,}: mínimo 8 caracteres
export function isStrongerPassword(password: string): boolean {
	const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
	return strongPasswordRegex.test(password);
}

// formato valido, suficiente para la mayoria de casos
export function isValidEmail(email: string): boolean {
	const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return validEmailRegex.test(email);
}

// solo letras, números y guión bajo (_), mínimo 3 caracteres
export function isValidDisplayName(name: string): boolean {
	const validDisplayName = /^[a-zA-Z0-9_]{3,}$/;
	return validDisplayName.test(name);
}
