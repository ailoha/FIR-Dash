import { useState, useRef } from 'react'
import { Dialog } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import Modal from './modal'

interface ProjectDetailsProps {
  item: any; // replace 'any' with the actual type of 'item'
  onClose: () => void;
}

export default function ProjectDetails({ item, onClose }: ProjectDetailsProps) {
  const [open, setOpen] = useState(true)
  const closeButtonRef = useRef(null)

  const handleClose = () => {
    setOpen(false);
    onClose();
  }

  return (
    <Modal open={open} onClose={(handleClose)}>
      <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                测试标题
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  测试文本 行1
                  测试文本 行2
                  测试文本 行3  
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-mono text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-3 sm:w-auto"
            onClick={onClose}
            ref={closeButtonRef}
          >
            关闭
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-mono text-white shadow-sm hover:bg-blue-500 sm:mt-0 sm:w-auto"
            onClick={onClose}
          >
            编辑
          </button>
        </div>
      </Dialog.Panel>
    </Modal>
  )
}
