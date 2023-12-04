import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="flex flex-col lg:flex-row items-center bg-slate-900 dark:bg-slate-800">
        <div className="p-10 flex flex-col bg:[#2b2929] dark:bg-slate-800 text-white space-y-5">
          <h1 className="text-5xl font-bold">
            Welcome to Dropbox
            <br />
            <br />
            Securely collaborate on your content anywhere, anytime
          </h1>
          <p>
            With Dropbox, you get a full suite of tools designed to help you
            create, share, manage, and track content more efficiently. Plus,
            proven cloud storage you can trust.
          </p>
          <Link
            href="/dashboard"
            className="flex bg-blue-500 cursor-pointer p-5 w-fit"
          >
            Try it for free
            <ArrowRight className="ml-10" />
          </Link>
        </div>
        <div className="bg:[#1eb1919] dark:bg-slate-800 p-10 h-full flex">
          <video autoPlay loop muted className="rounded-lg">
            <source
              src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/dropbox/dbx1-hero-1920x1080.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </main>
  );
}
