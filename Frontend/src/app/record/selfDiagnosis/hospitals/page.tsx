import Link from 'next/link';

import NearbyHospitalsMap from '@/components/Record/SelfDiagnosis/NearbyHospitalsMap';
import Back from '@/svgs/backIcon.svg';

export default function HospitalsPage() {
  return (
    <div className="-m-4 h-screen">
      <header className="fixed top-0 z-10 flex flex-col w-full items-center">
        <Link className="absolute top-5 left-5" href="/record">
          <Back />
        </Link>
        <div className="bg-[#d2e4bd] rounded-b-3xl text-center shadow-lg h-24 justify-center flex flex-col w-full">
          <span className="text-2xl  font-nanumBold text-main4 ">근처 병원</span>
          <span className="opacity-45 mt-1">내 위치에서 가장 가까운 순으로 보여요.</span>
        </div>
      </header>
      <main className=" w-full">
        <NearbyHospitalsMap />
      </main>
    </div>
  );
}
