"use client"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { NavItemType } from "@/Types/ComponentTypes";
import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";

function Navbarcollapse({ category }: { category: NavItemType }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      key={category?.label + category?.href}
      open={isOpen}
      onOpenChange={setIsOpen}
      // UI/UX Improvement 1: Increased vertical spacing (gap-3) for better visual separation.
      // Used 'w-full' to ensure it takes up the full width in the dropdown context.
      className="flex w-full flex-col gap-3 p-1" 
    >
      <div className="flex items-center justify-between min-w-max"> 
        {/*
          UI/UX Improvement 2: Separate the Link and the Toggle for distinct interaction zones.
          The Link is the main category navigation.
        */}
        <Link
          href={category.href!}
          className={clsx(
            // Base styles for the main category link:
            "flex-1 flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200", 
            "font-semibold text-gray-700 dark:text-gray-200",

            // Hover state: Use background change for a more sophisticated, contained hover effect.
            "hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/30 dark:hover:text-green-400", 

            // Active/Open state: Solid background or bolder appearance for strong feedback.
            // Removed border-bottom for a cleaner look in a dropdown menu; padding should be sufficient.
            isOpen && 
              "bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400"
          )}
        >
          {category.image && (
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${category.image}`}
              alt={category.label}
              width={20}
              height={20}
              // Added shadow-sm for a slight lift, making the icon pop a bit more.
              className="w-5 h-5 rounded-md object-cover shadow-sm" 
            />
          )}
          {category.label}
        </Link>
        
        {/*
          UI/UX Improvement 3: The Chevron Button should only appear if there are sub-links.
          It is positioned to the right to maintain a clean structure.
        */}
        {category?.links && category?.links?.length > 0 && (
          <CollapsibleTrigger asChild>
            {/*
              Improvement: Used a more accessible, slightly larger size-9 and
              a clearer hover state (hover:bg-gray-100) for the button itself.
              Using text-gray-500 for the icon to be secondary to the link text.
            */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="size-9 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700/50 dark:text-gray-400"
            >
              {isOpen ? <ChevronUp className="size-5" /> : <ChevronDown className="size-5" />}
              <span className="sr-only">Toggle {category.label} submenu</span>
            </Button>
          </CollapsibleTrigger>
        )}
      </div>

      <CollapsibleContent className="flex flex-col">
        {/*
          UI/UX Improvement 4: Sub-links Styling for Hierarchy.
          - Added **py-1.5** for slightly less aggressive spacing than the main link.
          - Used **ml-8** to significantly indent the sub-items, visually separating them from the main category.
          - Used **border-l-2** and **border-gray-200** as a visual guideline (vertical line) to reinforce hierarchy.
          - On hover, the vertical line changes color (**hover:border-green-500**) for better feedback.
          - Text is slightly lighter (**text-gray-600**) to distinguish it from the main category text.
        */}
        {category?.links?.map((subItem) => (
          <Link
            key={subItem.label}
            href={subItem.href!}
            className={clsx(
              "flex items-center gap-3 ml-8 pl-4 py-1.5 rounded-r-lg transition-colors duration-200", 
              "border-l-2 border-gray-200 dark:border-gray-700",
              "text-sm font-normal text-gray-600 dark:text-gray-300",
              // Hover state: Use a light background and primary text color.
              "hover:bg-green-50 hover:text-green-600 hover:border-green-500 dark:hover:bg-green-900/20 dark:hover:text-green-400" 
            )}
          >
            {/*
              UI/UX Improvement 5: Removed Image from Sub-items (Optional but Recommended).
              Repeating the category image on every sub-item adds visual noise.
              If the sub-item has its own image, it should be used. Otherwise, keeping it clean is better.
              I'm commenting it out for a cleaner look. If required, the existing code can be uncommented.
            */}
            {/* {category.image && (
               <Image
                 src={`${process.env.NEXT_PUBLIC_IMAGE_SERVER}/${category.image}`}
                 alt={subItem.label}
                 width={20}
                 height={20}
                 className="w-5 h-5 rounded-md object-cover opacity-50"
               />
            )} 
            */}
            {subItem.label}
          </Link>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
}

export default Navbarcollapse;