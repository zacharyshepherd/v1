'use client'

import { useState, useRef } from 'react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { Dialog, DialogPanel, Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
import Image from "next/image";
import profileImage from "/public/images/profile.png"

const currentYear = new Date().getFullYear()

const navigation = {
  main: [
    { name: 'About', href: 'about' },
    { name: 'Experience', href: 'experience' },
    { name: 'Work', href: 'work' },
    { name: 'Contact', href: 'contact' },
  ],
  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: (
        <svg fill="currentColor" aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (
        <svg fill="currentColor" aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'X',
      href: '#',
      icon: (
        <svg fill="currentColor" aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24">
          <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
        </svg>
      ),
    },
    {
      name: 'GitHub',
      href: '#',
      icon: (
        <svg fill="currentColor" aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'YouTube',
      href: '#',
      icon: (
        <svg fill="currentColor" aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

const caseStudies = [
  {
    client: "ADS dental transitions",
    preview: require("/public/images/ads-preview.webp"),
    service:"Lead Developer",
    href: "https://www.adstransitions.com/",
    date: "Januarary 2019",
    summary: [
      "I developed a custom WordPress website for a large dental brokerage, creating a responsive design that seamlessly integrated their branding. The project focused on optimizing performance and enhancing user experience. Additionally, I built a custom dashboard for agents using PHP and JavaScript to streamline management."

    ]
  },
  {
    client: "Nurturing Parenting",
    preview: require("/public/images/parenting-preview.webp"),
    service:"Lead Developer",
    href: "https://www.nurturingparenting.com/",
    date: "Januarary 2019",
    summary: [
      "I led the development of a website for Nurturing Parenting, an organization focused on supporting families in need. The site was designed to be user-friendly, highlighting their customized programs and resources that empower parents through education and nurturing practices. The project aimed to effectively communicate the organization's mission and the impact of their work through a seamless digital experience.",
    ]
  },
  {
    client: "R&O Construction",
    preview: require("/public/images/randoco-preview.webp"),
    service:"Lead Developer",
    href: "https://www.randoco.com/",
    date: "Januarary 2019",
    summary: [
      "Led the development of a custom Project Management Software for R&O Construction Company. This involved designing and building a robust system to streamline project workflows, enhance team collaboration, and improve overall project efficiency. The software was tailored to meet the specific needs of the construction industry, integrating features like task management, scheduling, and real-time reporting.",
    ]
  },
];



const skills = ['Java', 'Spring Boot', 'MySQL', 'JavaScript (ES6+)', 'TypeScript', 'React', 'Node.js', 'SCSS'];

const jobs = [
  {
    title: "Senior Web Developer",
    name: "RC Willey",
    link: "https://www.rcwilley.com/",
    date: "Jan 2019 - Present",
    description:[
      "Partner with designers, project managers, and fellow engineers to bring innovative concepts to life for customers and stakeholders.",
      "Provide strong leadership within the engineering department by fostering a culture of collaboration, actively sharing expertise, and offering mentorship to colleagues.",
    ],
    skill: ["Java", "JSTL", "Linux", "MySQL", "SCSS", "Spring Boot", "Gradle", "TypeScript", "jQuery", "Bootstrap", "React", "React Native", "Expo"],

  },
  {
    title: "Web Developer",
    name: "Infogenix",
    link: "https://infogenix.com/",
    date: "Jan 2018 - Dec 2018",
    description: [
      "Engineered a diverse range of products, including SaaS applications, eCommerce platforms, and bespoke digital solutions, utilizing modern tech stacks and development frameworks.",
      "Engaged in in-depth consultations with clients to architect and implement tailored digital solutions, ensuring alignment with business goals and technical requirements.",
      "Delivered cutting-edge technology projects across various industries, employing advanced methodologies such as Agile and DevOps to enhance development efficiency and product quality.",
      "Implemented rigorous testing protocols and continuous integration/continuous deployment (CI/CD) pipelines to maintain high standards of quality and performance in all developed products.",
    ],
    skill: ["Perl", "PHP", "NodeJS", "MySQL", "SCSS", "CSS", "jQuery", "Wordpress",]
  },
  {
    title: "Freelancer",
    name: "KSL",
    link: "https://ksl.com/",
    date: "Oct 2016 - Jan 2018",
    description: [
      "Designed and built responsive websites for small companies and startups, utilizing WordPress and creating custom themes tailored to their brand.",
      "Created compelling logos and graphic designs to help businesses establish a strong visual identity. From Vehichle wraps to logos",
      "Provided comprehensive services from initial concept through to final deployment, ensuring a seamless experience for clients.",
    ],
    skill: ["PHP", "WordPress", "jQuery", "Photoshop", "Illustrator"]
  },
]

export default function Home() {
  return (
    <main className='max-w-7xl w-full px-8 mx-auto'>
      {/* Header */}
      <header className='fixed w-full py-6 lg:px-8 m-auto top-0 left-0 z-50'>
        <nav aria-label="Global" className="mx-auto flex items-center justify-between px-6">
          <div className="flex lg:flex-1">
            <button className="-m-1.5 p-1.5" onClick={() => {
              const elemnt = document.getElementById('hero');
              elemnt?.scrollIntoView({
                behavior: 'smooth'
              })
            }}>
              <span className="sr-only">Zachary Shepherd</span>
              <svg xmlns="http://www.w3.org/2000/svg" className='h-10 w-auto' zoomAndPan="magnify" viewBox="0 0 75 74.999997" preserveAspectRatio="xMidYMid meet" version="1.0"><defs><g/><clipPath id="00e7f4d56e"><path d="M 2.023438 2.15625 L 73.273438 2.15625 L 73.273438 73.40625 L 2.023438 73.40625 Z M 2.023438 2.15625 " clip-rule="nonzero"/></clipPath><clipPath id="0ace7073a7"><path d="M 8.023438 2.15625 L 67.121094 2.15625 C 70.4375 2.15625 73.121094 4.84375 73.121094 8.15625 L 73.121094 67.253906 C 73.121094 70.570312 70.4375 73.253906 67.121094 73.253906 L 8.023438 73.253906 C 4.710938 73.253906 2.023438 70.570312 2.023438 67.253906 L 2.023438 8.15625 C 2.023438 4.84375 4.710938 2.15625 8.023438 2.15625 Z M 8.023438 2.15625 " clip-rule="nonzero"/></clipPath></defs><g clip-path="url(#00e7f4d56e)"><g clip-path="url(#0ace7073a7)"><path stroke-linecap="butt" transform="matrix(0.75, 0, 0, 0.75, 2.025001, 2.157129)" fill="none" stroke-linejoin="miter" d="M 7.997916 -0.00117184 L 86.794797 -0.00117184 C 91.216672 -0.00117184 94.794798 3.582162 94.794798 7.998829 L 94.794798 86.79571 C 94.794798 91.217586 91.216672 94.795711 86.794797 94.795711 L 7.997916 94.795711 C 3.581249 94.795711 -0.00208511 91.217586 -0.00208511 86.79571 L -0.00208511 7.998829 C -0.00208511 3.582162 3.581249 -0.00117184 7.997916 -0.00117184 Z M 7.997916 -0.00117184 " stroke="#22d3ee" stroke-width="16" stroke-opacity="1" stroke-miterlimit="4"/></g></g><g fill="#22d3ee" fill-opacity="1"><g transform="translate(16.473825, 58.300005)"><g><path d="M 4.46875 0 L 4.46875 -7 L 25.21875 -32.6875 L 25.21875 -33 L 5.1875 -33 L 5.1875 -42.375 L 39.375 -42.375 L 39.375 -34.734375 L 19.890625 -9.6875 L 19.890625 -9.375 L 40.078125 -9.375 L 40.078125 0 Z M 4.46875 0 "/></g></g></g></svg>              
            </button>        
            </div>
            <div className='flex lg:gap-x-12'>
            <div className="hidden lg:flex lg:gap-x-12 items-center">
              {navigation.main.map((item) => (
                <button key={item.name} className="text-sm target font-semibold leading-6 text-gray-300" onClick={() => {
                  const elemnt = document.getElementById(item.href);
                  elemnt?.scrollIntoView({
                    behavior: 'smooth'
                  })
                }}>
                  {item.name}
                </button>
              ))}
            </div>
            <div className="hidden lg:flex">
              <a href="#" className="text-sm font-semibold leading-6 rounded-md border-2 border-cyan-400 px-3.5 py-2.5 font-semibold text-white shadow-sm hover:bg-cyan-600 focus-visible:border focus-visible:border-2 focus-visible:border-spacing-2 focus-visible:border-cyan-600">
                Resume <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section id='hero' className="relative isolate flex h-screen">
          <div className="w-full m-auto">
            <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-4xl">
              <p className='text-cyan-400 text-1xl font-mono'>Hello, my name is</p>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-200 sm:text-6xl">
                Zachary Shepherd
              </h1>
              <h2 className='mt-4 text-4xl font-bold tracking-tight text-slate-400 sm:text-6xl'>I am a Software Engineer</h2>
              <p className="mt-8 text-lg leading-8 text-slate-400">
                I’m a software engineer at <a className='text-cyan-400' href='https://rcwilley.com' target='blank'>RC Willey</a>, specializing in building (and occasionally designing) exceptional digital experiences. Currently, I’m focused on creating accessible, human-centered products.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <a
                  href="#"
                  className="rounded-md border-2 border-cyan-400 px-3.5 py-2.5 text-sm font-semibold text-slate-200 shadow-sm hover:bg-cyan-600 focus-visible:border focus-visible:border-2 focus-visible:border-spacing-2 focus-visible:border-cyan-600"
                >
                  View Resume                
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
          <section id='about' className="overflow-hidden py-20 sm:py-32">
            <div className="mx-auto max-w-7xl lg:mx-32">
              <h2 className="text-2xl font-bold tracking-tight text-slate-200 sm:text-2xl mb-8">About Me</h2>
              <div className="grid grid-cols-1 gap-x-10 gap-y-16 sm:gap-y-20 lg:grid-cols-3 lg:items-start">
                <div className="col-span-2 lg:pr-4">
                    <p className="leading-8 text-slate-400">
                      Hello! My name is Zachary, and I enjoy creating things that live on the internet. My interest in web development started back in 2012 at Jordan Applied Technology Center 
                      when I built my first wordpress theme — it sparked a passion for coding and taught me a lot about the fundamentals of web development.
                    </p>
                    <p className="mt-4 leading-8 text-slate-400">
                      Fast-forward to today, and I’ve had the privilege of working at an <a className='text-cyan-400' href="https://infogenix.com/" target="_blank">advertising agency</a>, a <a className='text-cyan-400' href="https://www.rcwilley.com/" target="_blank">large corporation</a>, and a student-led design studio. 
                      My main focus these days is building accessible, inclusive products and digital experiences at <a className='text-cyan-400' href="https://rcwilley.com/" target="_blank">RC Willey</a> for a variety of customers.
                    </p>
                    <p className="mt-4 leading-8 text-slate-400">
                    I am continually learning and exploring new technologies to enhance my skills and stay updated with the latest trends in web development.
                    </p>
                    <ul className='mt-4 grid grid-cols-2 gap-4 text-slate-200'>
                      {skills && skills.map((skill, i) => <li className='flex gap-x-3' key={i}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-5 flex-none text-cyan-400">
    <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg> {skill}
                        </li>)}
                    </ul>
                </div>
                <div className="sm:px-6 lg:px-0">
                    <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
                      <Image
                      alt="Zachary Shepherd Profile Image"
                      src={profileImage}
                      className="w-100 max-w-[300px] m-auto rounded pt-4 bg-slate-800" />
                    </div>
                </div>
              </div>
            </div>
          </section>


        {/* EXPERINCE */}
        <section id='experience' className='overflow-hidden py-20 sm:py-32'>
          <div className="mx-auto max-w-7xl lg:px-8">
            <div className="mx-auto max-w-4xl divide-y divide-white/10">
            <h2 className="text-2xl font-bold tracking-tight text-gray-300 sm:text-2xl mb-8">Where I’ve Worked</h2>
              <dl className="mt-10 space-y-6 divide-y divide-white/10">
                {jobs.map((job, i) => (
                  <Disclosure defaultOpen={i==0?true:false} key={i + 1} as="div" className="pt-6">
                    <dt>
                      <DisclosureButton className="group flex w-full items-start justify-between text-left text-slate-200">
                        <span className="text-base font-semibold leading-7">{job.title} <a href={job.link} target='_blank' className='text-cyan-400 text-nowrap'>@ {job.name}</a></span>
                        <span className="ml-6 flex h-7 items-center">
                          <span className='mr-4'>{job.date}</span>
                          <PlusSmallIcon aria-hidden="true" className="h-6 w-6 group-data-[open]:hidden" />
                          <MinusSmallIcon aria-hidden="true" className="h-6 w-6 [.group:not([data-open])_&]:hidden" />
                        </span>
                      </DisclosureButton>
                    </dt>
                    <DisclosurePanel as="dd" className="mt-2 pr-12">
                    <ul className='mt-4 space-y-2'>
                        {job.description && job.description.map((description, i) => <li className='flex gap-x-3 text-slate-400' key={job.name}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-5 flex-none text-cyan-400">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg> {description}
                          </li>)}
                      </ul>
                      <div className='flex flex-wrap gap-2 mt-4'>
                      {job.skill && job.skill.map((skill, i) =>
                        <span key={skill} className="inline-flex items-center rounded-md bg-cyan-400/10 px-2 py-1 text-xs font-medium text-cyan-400 ring-1 ring-inset ring-cyan-400/20">
                            {skill}
                        </span>
                      )}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* WORK */}
        <section id='work' className="overflow-hidden py-20 sm:py-32">
          <div className="mx-auto max-w-7xl lg:mx-20">
          <h2 className="text-2xl font-bold tracking-tight text-gray-300 sm:text-2xl mb-8">Project Showcase</h2>
            {caseStudies.map((caseStudy, i) => ( 
                <article key={caseStudy.client} className='mb-10'>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-8 mt-4">
                    <div className="col-span-full sm:flex sm:items-center sm:justify-between sm:gap-x-8 lg:col-span-1 lg:block">
                      <div className="sm:flex sm:items-center sm:gap-x-6 lg:block">
                        <a href={caseStudy.href} target='_blank'>
                          <div className="relative rounded">
                            <div className="bg-cyan-500 hover:bg-transparent rounded opacity-50 hover:bg-opacity-100 w-full h-full absolute transition" />
                            <Image
                              src={caseStudy.preview}
                              alt={caseStudy.client + " Screenshot"}
                              className="w-100 rounded flex-none"
                            />
                            </div>
                          </a>
                        </div>
                    </div>
                    <div className="col-span-full lg:col-span-1 lg:max-w-2xl">
                      <h3 className="text-2xl font-bold tracking-tight text-gray-300 sm:text-2xl mb-8">
                          {caseStudy.client}
                      </h3>
                      <div className="mt-6 space-y-6 text-base text-neutral-600">
                        {caseStudy.summary.map((paragraph) => (
                          <p className="mt-4 leading-8 text-slate-400" key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                      <div className="mt-8 flex">
                        <a
                          href={caseStudy.href}
                          aria-label={`Read case study: ${caseStudy.client}`}
                          target='_blank'
                          className="text-sm font-semibold leading-6 rounded-md border-2 border-cyan-400 px-3.5 py-2.5 font-semibold text-white shadow-sm hover:bg-cyan-600 focus-visible:border focus-visible:border-2 focus-visible:border-spacing-2 focus-visible:border-cyan-600">
                          View Website
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id='contact' className='overflow-hidden py-20 sm:py-32 text-center max-w-2xl mx-auto'>
          <h2 className='text-2xl font-bold tracking-tight text-gray-300 sm:text-2xl mb-8'>Contact Me</h2>
          <p className='leading-8 text-slate-400 pb-5'>While I’m not actively seeking new opportunities at the moment, my inbox is always open. If you have any questions or just want to connect, feel free to reach out—I’d be happy to hear from you!</p>
          <a href="mailto:zacharyshepherd@outlook.com" className="text-lg inline-block font-semibold leading-6 rounded-lg border-2 border-cyan-400 px-3.5 py-2.5 font-semibold text-white shadow-sm hover:bg-cyan-600 focus-visible:outline focus-visible:border-2 focus-visible:outline-border-2 focus-visible:outline-cyan-600">
              Say Hello  
          </a>
        </section>

        
        


        {/* FOOTER */}
        <footer>
          <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
            <nav aria-label="Footer" className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12">
              {navigation.main.map((item) => (
                <div key={item.name} className="pb-6">
                  <a href={item.href} className="text-sm leading-6 text-slate-400 hover:text-cyan-400">
                    {item.name}
                  </a>
                </div>
              ))}
            </nav>
            <div className="mt-10 flex justify-center space-x-10">
              {navigation.social.map((item) => (
                <a key={item.name} href={item.href} className="text-slate-400 hover:text-cyan-400">
                  <span className="sr-only">{item.name}</span>
                  {item.icon}
                </a>
              ))}
            </div>
            <p className="mt-10 text-center text-xs leading-5 text-slate-400">
              &copy; {currentYear} Zachary Shepherd, Inc. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
  )
}

