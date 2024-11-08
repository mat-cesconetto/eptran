import { useState, ChangeEvent } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

interface CustomCheckboxProps {
  label: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  isForLogin?: boolean;
}

const CustomCheckbox = ({
  label,
  onChange,
  className,
  isForLogin = false,
}: CustomCheckboxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    if (onChange) onChange(e);
  };

  const handleAccept = () => {
    setIsChecked(true); 
    onClose(); 
  };

  return (
    <div className={`flex items-center gap-2 ${className || ""}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="appearance-none w-5 h-5 border-2 border-[#003966] rounded-md cursor-pointer peer"
        />
        <div
          className={`absolute top-0 left-0 w-5 h-5 flex rounded-md items-center justify-center pointer-events-none ${
            isChecked ? "bg-[#003966] border-[#003966]" : "border-[#003966]"
          }`}
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
      {isForLogin ? (
        <span className="text-[#003966] text-sm md:text-base">{label}</span>
      ) : (
        <span className="text-[#003966] text-sm md:text-base">
          Concordo com os
          <a
            onClick={onOpen}
            className="text-[#003966] ml-1 underline cursor-pointer"
          >
            termos de serviço
          </a>
        </span>
      )}

      {!isForLogin && (
        <Modal
          isOpen={isOpen}
          onOpenChange={onClose}
          scrollBehavior="inside"
          size="2xl"
          placement="center"
        >
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Termos de Serviço
                </ModalHeader>
                <ModalBody>
                  {/* Conteúdo dos termos de serviço */}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Fechar
                  </Button>
                  <Button color="primary" onPress={handleAccept}>
                    Aceitar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default CustomCheckbox;