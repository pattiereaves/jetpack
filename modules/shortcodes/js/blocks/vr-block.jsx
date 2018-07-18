/* global wp */
/* eslint react/react-in-jsx-scope: 0 */

( function( blocks, components, i18n ) {
	const { registerBlockType } = blocks;
	const {
		Placeholder,
		SelectControl,
		TextControl
	} = components;
	const { __ } = i18n;

	registerBlockType( 'jetpack/vr', {
		title: __( 'VR Image', 'jetpack' ),
		description: __( 'Embed 360° photos and Virtual Reality (VR) Content', 'jetpack' ),
		icon: 'embed-photo',
		category: 'embed',
		support: {
			html: false
		},
		attributes: {
			url: {
				type: 'string',
			},
			view: {
				type: 'string',
			}
		},

		edit: props => {
			const attributes = props.attributes;

			const onSetUrl = value => props.setAttributes( { url: value } );
			const onSetView = value => props.setAttributes( { view: value } );

			const renderEdit = () => {
				if ( attributes.url && attributes.view ) {
					return (
						<div className={ props.className }>
							<iframe
								title={ __( 'VR Image', 'jetpack' ) }
								allowFullScreen="true"
								frameBorder="0"
								width="100%"
								height="300"
								src={ 'https://vr.me.sh/view/?view=' + encodeURIComponent( attributes.view ) + '&url=' + encodeURIComponent( attributes.url ) }
							/>
						</div>
					);
				}
				return (
					<div>
						<Placeholder
							key="placeholder"
							icon="format-image"
							label={ __( 'VR Image', 'jetpack' ) }
							className={ props.className }
						>
							<TextControl
								style={ { flex: '1 1 auto' } }
								label={ __( 'Enter URL to VR image', 'jetpack' ) }
								value={ attributes.url }
								onChange={ onSetUrl }
							/>
							<SelectControl
								label={ __( 'View Type', 'jetpack' ) }
								value={ attributes.view }
								onChange={ onSetView }
								options={ [
									{ label: '', value: '' },
									{ label: __( '360°', 'jetpack' ), value: '360' },
									{ label: __( 'Cinema', 'jetpack' ), value: 'cinema' },
								] }
							/>
						</Placeholder>
					</div>
				);
			};

			return renderEdit();
		},
		save: ( props ) => {
			return (
				<div className={ props.className }>
					<iframe
						title={ __( 'VR Image', 'jetpack' ) }
						allowFullScreen="true"
						frameBorder="0"
						width="100%"
						height="300"
						src={ 'https://vr.me.sh/view/?view=' + encodeURIComponent( props.attributes.view ) + '&url=' + encodeURIComponent( props.attributes.url ) }
					/>
				</div>
			);
		}
	} );
} )( wp.blocks, wp.components, wp.i18n );
