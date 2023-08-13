import { NextResponse } from "next/server";
import { connectDB } from '../../../../utils/connectDB';
import Task from "../../../../models/Task";

export async function GET(request, { params }) {
    try {
        connectDB()
        const taskFound = await Task.findById(params.id)
        //Si el id no coincide lanza Tarea no encontrda
        if (!taskFound)
            return NextResponse.json({
                message: 'Tarea no encontrada'
            }, { status: 404 })

        console.log(taskFound)
        return NextResponse.json(taskFound)

    } catch (error) {
        //Cualquier otro error es considerado aca
        return NextResponse.json(error.message, { status: 400 })
    }
}

export async function DELETE(request, { params }) {
    try {
        const deletedTask = await Task.findByIdAndDelete(params.id)

        if (!deletedTask)
            return NextResponse.json({ message: "Tarea no encontrada" }, { status: 404 })

        console.log(deletedTask)
        return NextResponse.json(deletedTask)
    } catch (error) {
        NextResponse.json(error.message, { status: 400 })
    }
}


export async function PUT(request, { params }) {
    try {
        const data = await request.json()
        const taskUpdated = await Task.findByIdAndUpdate(params.id, data, { new: true })
        return NextResponse.json(taskUpdated)
    } catch (error) {
        return NextResponse.json(error.message, { status: 400 })
    }
}