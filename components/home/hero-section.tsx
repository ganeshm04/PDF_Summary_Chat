import { ArrowRight, Sparkle } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";

export default function HeroSection() {
    return (

        <section className="relative mx-auto flex flex-col z-0 items-center justify-center py-16 sm:py-20 lg:pb-28 transition-all animate-in lg:px-12 max-w-7xl">
            <div className="">
                <div className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-amber-200 via-amber-500 to-amber-800 animate-gradient-x group">
                    <Badge variant={'secondary'}
                        className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-gray-50 transition-colors duration-200">
                        <Sparkle className="h-6 w-6 mr-2 text-amber-600 animate-pulse" />
                        <p className="text-base text-amber-600">Powered by AI</p>
                    </Badge>
                </div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-center mt-8">
                Transform PDFs into{' '}
                <span className="relative inline-block">
                    <span className="relative z-10 px-2">concise </span>
                    <span
                        className="absolute inset-0 rounded-lg bg-amber-200/50 -rotate-2 transform -skew-y-1 "
                        area-hidden="true"
                    ></span>
                </span>
                Summaries{' '}
            </h1>
            <h2 className="text-lg sm:text-xl lg:text-2xl text-center mt-4 text-gray-600">
                Get a beautiful summary reel of the document in seconds.
            </h2>
             {/* Call to Action Button */}
        <div className="mt-8 sm:mt-12">
          <Button
            variant={'link'}
            className="text-base text-white mt-4 sm:text-lg lg:text-xl rounded-full px-8 sm:px-10 lg:px-12 py-4 sm:py-7 lg:py-8 bg-gradient-to-r from-slate-900 to-amber-500 hover:from-amber-500 hover:to-slate-900 hover:no-underline font-bold shadow-lg transition-all duration-300"
          >
            <Link href={'/#pricing'} className="flex gap-2 items-center">
              <span>Try Sommaire</span>
              <ArrowRight className="animate-pluse" />
            </Link>
          </Button>
        </div>
        </section>
    )
}