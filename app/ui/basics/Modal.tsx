export default function Modal( { isVisible, children }: { isVisible: boolean, children: React.ReactNode } ) {

	if ( !isVisible ) return null;

	return (
		<div 
			className="fixed inset-0 bg-black bg-opacity-25 backgrop-blur-sm flex justify-center items-center z-50 flex-col w-full" >
			{ children }
		</div>
	);
};