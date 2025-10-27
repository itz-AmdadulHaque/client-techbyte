import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ConsultantType } from "@/Types/Types"
import Image from "next/image"
import ContactAdmin from "./ContactAdmin"

export function ConsultantDetails({ consultant }: { consultant: ConsultantType }) {
    return (
        <Dialog>

            <DialogTrigger asChild>
                <Button variant="outline">View Details</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Consultant Details</DialogTitle>
                </DialogHeader>
                <div className="min-w-96">

                    <div className="grid grid-cols-3 gap-3">

                        <Image
                            src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${consultant.image}`}
                            alt={consultant.fullName}
                            width={100}
                            height={100}
                            className="w-36 max-h-40 object-cover rounded-sm"
                        />

                        <div className="col-span-2">
                            <h1 className="text-xl font-bold mb-1">{consultant.fullName}</h1>
                            <p className="text-xs text-muted-foreground">{consultant.title}</p>

                            <div>
                                <p className="text-shadow-md font-semibold mt-4 text-sm">Specializations</p>

                                <div className="flex flex-wrap gap-2 mb-4 mt-2">
                                    {consultant.specializations.map((spec, i) => (
                                        <span
                                            key={i}
                                            className="px-2 py-1 text-xs bg-gray-100 rounded-full border"
                                        >
                                            {spec}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <p className="my-4 text-sm text-justify">{consultant.bio}</p>

                    <div>
                        <h2 className="text-shadow-md font-semibold mt-6 mb-2 ">Qualifications</h2>
                        <div>
                            {
                                consultant.qualifications.map((item, index) => <div key={index} className="flex gap-2 text-sm">
                                    <span className="font-semibold">{item.title}</span>
                                    <span>-</span>
                                    <span>{item.institute}</span>
                                </div>)
                            }
                        </div>

                    </div>


                    <div>
                        <h2 className="text-shadow-md font-semibold mt-6 mb-2 ">Location</h2>
                        <p className="text-sm">{consultant.address}</p>

                    </div>

                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                    </DialogClose>
                    <ContactAdmin />
                </DialogFooter>
            </DialogContent>

        </Dialog>
    )
}
