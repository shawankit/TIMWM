const Icon = ({ ...property }) => (
    <img
        onClick={property.onClick}
        src={property.src}
        width={property.width}
        height={property.height}
        className={property.className}
        alt=""
    />
);

export default Icon;
