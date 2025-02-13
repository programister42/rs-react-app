import { Outlet } from 'react-router';

export function CheckeredBackground() {
  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <svg
        aria-hidden="true"
        className="j u do pe asc bjd stroke-gray-200 size-full -z-10 inset-x-0 absolute"
      >
        <defs>
          <pattern
            x="50%"
            y="-1"
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width="200"
            height="200"
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none"></path>
          </pattern>
        </defs>
        <rect
          fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
          width="100%"
          height="100%"
          strokeWidth="0"
        ></rect>
      </svg>

      <Outlet />
    </div>
  );
}
