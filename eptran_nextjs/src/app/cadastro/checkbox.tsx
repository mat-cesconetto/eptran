import { useState, ChangeEvent } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react"; // ou a lib que você está usando

interface CustomCheckboxProps {
  label: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const CustomCheckbox = ({
  label,
  onChange,
  className,
}: CustomCheckboxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    if (onChange) onChange(e);
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <label
      className={`flex items-center gap-2 cursor-pointer ${className || ""}`}
    >
      <div className="relative">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
          className="peer sr-only"
        />
        <div
          className="w-5 h-5 border-2 border-[#003966] rounded-md 
          peer-checked:bg-[#003966] peer-checked:border-[#003966] 
          transition-all duration-200 ease-in-out
          flex items-center justify-center"
        >
          <svg
            className={`w-3 h-3 ${isChecked ? "text-white" : "hidden"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>
      <span className="text-[#003966] text-sm md:text-base">
        Concordo com os
        <a
          onClick={onOpen}
          className="text-[#003966] ml-1 underline cursor-pointer"
        >
          termos de serviço
        </a>
      </span>
      <Modal
        isOpen={isOpen}
        onOpenChange={onClose}
        scrollBehavior="inside"
        size="sm"
        placement="center"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Termos de Serviço
              </ModalHeader>
              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat
                  consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
                  incididunt cillum quis. Velit duis sit officia eiusmod Lorem
                  aliqua enim laboris do dolor eiusmod. Et mollit incididunt
                  nisi consectetur esse laborum eiusmod pariatur proident Lorem
                  eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
                {/* Continue o conteúdo do modal aqui */}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Fechar
                </Button>
                <Button color="primary" onPress={onClose}>
                  Aceitar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </label>
  );
};

export default CustomCheckbox;
