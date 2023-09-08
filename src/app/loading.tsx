import { Title, Text } from '@tremor/react';
// import Search from '../components/Search';

export default async function Loading() {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-[100rem]">
      <Title>源城区财政投资评审中心审核项目一览表</Title>
      <Text>
        （ 点击项目编号旁的{' '}
        <span className="inline-flex items-center rounded-md px-2 py-1 ring-1 ring-inset ring-opacity-10 text-xs font-medium font-mono bg-blue-50 ring-blue-500 text-blue-600 hover:bg-blue-100 hover:ring-blue-600 hover:text-blue-700">
          状态按钮
        </span>
        {' '}可查看项目详情 ）
      </Text>
      {/* <Search disabled /> */}
      <div className="tremor-base tr-relative tr-w-full tr-mx-auto tr-text-left tr-ring-1 tr-mt-6 tr-max-w-none tr-bg-white tr-shadow tr-border-blue-400 tr-ring-gray-200 tr-pl-6 tr-pr-6 tr-pt-6 tr-pb-6 tr-rounded-lg h-[360px]" />
    </main>
  );
}
