import { Injectable } from "@nestjs/common";

@Injectable()
export class RecadosUtils {
    invertString(str: string): string {
        // Invert a string
        // Example: "hello" -> "olleh"
        return str.split('').reverse().join('');
    }
}

@Injectable()
export class RecadosUtilsMock {
    invertString(str: string): string {
        // Invert a string
        // Example: "hello" -> "olleh"
        return 'bla bla bla';
    }
}