import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { NavItemType } from "@/Types/ComponentTypes"
import { ChevronDown, Menu } from "lucide-react"
import Link from "next/link"

export function NavbarDrawer({ navItems }: { navItems: NavItemType[] }) {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="outline" size="icon">
          <Menu strokeWidth={2.5} size={32} />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="px-4">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>


        <div className="flex flex-col justify-start gap-4">
          {navItems.map((item) =>
            item.links ? (
              <Collapsible key={item.label}>
                <CollapsibleTrigger className="group flex items-center justify-between w-full text-left">
                  <div className="flex items-center">
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.label}
                  </div>
                  <ChevronDown className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>

                <CollapsibleContent className="pl-6 my-4 flex flex-col items-start gap-4">
                  {item.links.map((subItem) => (
                    <SheetClose key={subItem.label}>
                      <Link href={subItem.href!} className="w-full text-left flex items-center">
                        {subItem.icon && <span className="mr-2">{subItem.icon}</span>}
                        {subItem.label}
                      </Link>
                    </SheetClose>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ) : (
              <SheetClose key={item.label}>
                <Link href={item.href!} className="w-full text-left flex items-center">
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </Link>
              </SheetClose>
            )
          )}
        </div>

        {/* <SheetFooter>
          
        </SheetFooter> */}

      </SheetContent>
    </Sheet>
  )
}
