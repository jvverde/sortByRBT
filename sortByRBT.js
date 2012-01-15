/**
* $sortByRBT  
* Copyright(c) 2011 Isidro Vila Verde (jvverde@gmail.com)
* Dual licensed under the MIT and GPL licenses
* Version: 1.0
* Last Revision: 15-01-2012
*
*
*ChangeLog
*version 1.0 (15-01-2012)
*/
function $sortByRBT($a, $f){
	if ($a.length < 2) return $a;
	if (!$f || ! $f instanceof Function) return undefined;				
	var $random =[];
	for (var $i = 0; $i < $a.length; $i++){ //init the indexes
		$random[$i] = $i;
	}
	for (var $i = 0; $i < $a.length; $i++){ //randomize de indexes
		var $j = Math.floor(Math.random() * $a.length);
		var $tmp = $random[$j];
		$random[$j] = $random[$i];
		$random[$i] = $tmp;
	}
	var $root = {				//chose the the first random element to be the root
			obj: $a[$random[0]]
	}
	function insert($i){
		var $obj = $a[$i];
		var $node = $root;
		do{
			var $cmp = $f($obj,$node.obj);
			if ($cmp == 0){ //balance to three when we have duplicated values
				if(!$node.left){
						$node.left ={
							parent: $node,
							obj: $obj
						}
						break;
				}
				if(!$node.right){
						$node.right ={
							parent: $node,
							obj: $obj
						}
						break;
				}
				var $d = Math.random();
				if ($d < 0.5){
					$node = $node.right;
				}else{
					$node = $node.left;
				}						
			}else if($cmp < 0){
				if(!$node.left){
						$node.left ={
							parent: $node,
							obj: $obj
						}
						break;
				}else{
					$node = $node.left;
				}
			}else{
				if(!$node.right){
						$node.right = {
							parent: $node,
							obj: $obj
						}
						break;
				}else{
					$node = $node.right;
				}
			}
		}while(1);
	}
	for (var $i = 1; $i < $a.length; $i++){
		insert($random[$i]);
	}
	function getLesser($node){
		var $n = $node;
		while($n.left) $n = $n.left;
		return $n
	}
	function getNext($node){
		var $right = $node.right;
		if ($right){
			return getLesser($right);
		}else{
			var $p = $node.parent;
			while ($p && $p.right === $node){
				$node = $p;
				$p = $node.parent;
			}
			return $p;
		}
	}
	var $r = [];
	var $node = getLesser($root);
	while($node){
		$r.push($node.obj);
		$node = getNext($node);
	}
	return $r;
}
