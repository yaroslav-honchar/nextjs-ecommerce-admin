"use client"

import { Modal } from "@/components/ui/modal"

const SetupPage = () => (
  <main>
    <Modal
      title={"Test modal"}
      description={"Test description"}
      isOpen={false}
      onClose={(): void => {}}
    >
      <p>Hello, modal!</p>
    </Modal>
  </main>
)
export default SetupPage
