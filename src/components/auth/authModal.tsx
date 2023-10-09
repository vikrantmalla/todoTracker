import TabsRender from "../tabs";

const AuthModal = () => {
  const handleModalClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
  };
  return (
    <>
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen px-4 pt-6 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div
            className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
            onClick={handleModalClick}
          >
            <div>
              <TabsRender />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthModal;
