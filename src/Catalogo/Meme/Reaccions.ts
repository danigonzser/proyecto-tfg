interface Reaccion{
    readonly id: number;
    emoji: string;
    reaccionador: Usuario;
    readonly fechaCreacion: Date;
}